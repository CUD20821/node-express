const getAllProductStatic = async (req, res, next) => {
  throw new Error('testing async errors')
  res.status(200).json({msg: 'product testing route'})
}

const getAllProducts = async (req, res, next) => {
  res.status(200).json({msg: 'product route'})
}

module.exports = {
  getAllProductStatic,
  getAllProducts
}