const Product = require('../models/product')

const getAllProductStatic = async (req, res, next) => {
  const products = await Product.find({ price: { $gt: 30 } })
    .sort('name')
    .select('name price')
    .limit(4)
    .skip(1)
  res.status(200).json({ products, nbHits: products.length })

}

const getAllProducts = async (req, res, next) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query
  const queryObj = {}
  if (featured) {
    queryObj.featured = featured === 'true' ? true : false
  }

  if (company) {
    queryObj.company = company
  }

  if (name) {
    queryObj.name = { $regex: name, $options: 'i' }
  }

  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': 'eq',
      '<': '$lt',
      '<=': '$lte'
    }
    const regEx = /\b(<|>|>=|=|<=)\b/g
    let filter = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)
    const options = ['price', 'rating']
    filter = filter.split(',').forEach((item) => {
        const [field, operator, value] = item.split('-')
        if(options.includes(field)){
          queryObj[field] ={[operator]: Number(value)}
        }
    })
  }


  console.log(queryObj)
  let result = Product.find(queryObj) // Create query Object, not execution to DB
  if (sort) {
    const sortList = sort.split(',').join(' ') // Mongoose required query have to be a string, if there more than 1 query have been passed, it has to be differentiated by space 
    result = result.sort(sortList)
  }
  else {
    result = result.sort('createAt')
  }

  if (fields) {
    const fieldsList = fields.split(',').join(' ')
    result = result.select(fieldsList)
  }

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)
  const products = await result // Execute to DB
  res.status(200).json({ products, nbHits: products.length })
}

module.exports = {
  getAllProductStatic,
  getAllProducts
}