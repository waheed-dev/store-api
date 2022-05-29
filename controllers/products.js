const products = require("../models/products")

const CreateProductsStatic = async (req,res) => {
const tasks = await products.create(req.body)
res.status(200).json({tasks})
}
const getAllProductsStatic = async (req,res) => {
    const items = await products.find({}).sort('-price')
    res.status(200).json({items,nbOfHita : items.length})
    }
const getAllProducts = async (req,res) => {
    const {featured,company,name,sort,fields} = req.query
    const queryObject = {}
    if (featured) {
        queryObject.featured = featured === 'true' ? true : false
    }
    if (company) {
        queryObject.company = company
    }
    if (name) {

        queryObject.name =  {$regex : name,$options : 'i'}
    }
    console.log(queryObject);
    let result =  products.find(queryObject)
    if (fields) {
        const selectedList = fields.split(',').join(' ')
        result.select(selectedList)
    }
    if (sort) {
        const sorted = sort.split(',').join(' ')
        result.sort(sorted)
    }
    else {
        result.sort('createdAt')
    }
    const items = await result
    res.status(200).json({items,nbOfHita : items.length})
    }
module.exports = {getAllProductsStatic,getAllProducts,CreateProductsStatic}
