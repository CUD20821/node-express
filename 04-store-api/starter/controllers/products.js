const Product = require('../models/product')

const getAllProductStatic = async (req, res, next) => {
  const search = 'duc'
  const products = await Product.find({
    name: {$regex: search, $options: 'i'},
  })
  res.status(200).json({ products, nbHits: products.length })

}

const getAllProducts = async (req, res, next) => {
  const { featured, company, name } = req.query
  const queryObj = {}
  if (featured) {
    queryObj.featured = featured === 'true' ? true : false
  }

  if (company) {
    queryObj.company = company
  }

  if (name) {
    queryObj.name = {$regex: name, $options: 'i'}
  }
  console.log(queryObj)
  const products = await Product.find(queryObj)
  res.status(200).json({ products, nbHits: products.length })
}

module.exports = {
  getAllProductStatic,
  getAllProducts
}