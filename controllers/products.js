const products = require("../models/products")

const CreateProductsStatic = async (req,res) => {
const tasks = await products.create(req.body)
res.status(200).json({tasks})
}
const getAllProductsStatic = async (req,res) => {
    const tasks = await products.find({featured : true})
    res.status(200).json({tasks,nbOfHita : tasks.length})
    }
const getAllProducts = async (req,res) => {
    res.status(200).json({msg : 'all products'})
    }
module.exports = {getAllProductsStatic,getAllProducts,CreateProductsStatic}
