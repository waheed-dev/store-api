const express = require('express')
const router = express.Router()

const {getAllProducts,getAllProductsStatic, CreateProductsStatic} = require('../controllers/products')
router.route('/').get(getAllProducts)
router.route('/static').get(getAllProductsStatic)
router.route('/static').post(CreateProductsStatic)

module.exports = router
