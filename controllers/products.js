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
    const {featured,company,name,sort,fields,numericFilters} = req.query
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
    if (numericFilters) {
        const operatorMap = {
            '>' : '$gt',
            '>=' : '$gte',
            '=' : '$eq',
            '<' : '$lt',
            '<=' : '$lte',
        }
        const regEx = /\b(<|>|<=|=|>=)\b/g
        let filters = numericFilters.replace(regEx,(match)=> `-${operatorMap[match]}-`)
        const options = ['price','rating']
        filters = filters.split(',').forEach((item)=> {
        const [field,operator,value] =item.split('-')
        if (options.includes(field)) {
        queryObject[field]= {[operator]:Number(value)}
        }
        })
        console.log(queryObject);
    }
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
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit
    result = result.skip(skip).limit(limit)
    const items = await result
    res.status(200).json({items,nbOfHita : items.length})
    }
module.exports = {getAllProductsStatic,getAllProducts,CreateProductsStatic}
