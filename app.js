const express = require('express')
require('dotenv').config()
require('express-async-errors')
const connectDb = require('./db/connect')
const errorHandler = require('./middlewars/error-handler')
const MONGO_URI = process.env.MONGO_URI
const app = express()
const notFound = require('./middlewars/not-found')
const productsRouter = require('./routes/products')
app.use(express.json())
app.get('/',(req,res)=>{
res.send('<h1>Store Api </h1> <a href="/api/v1/products" >Api route</a>')
})
app.use('/api/v1/products',productsRouter)




app.use(notFound)
app.use(errorHandler)
const port = process.env.PORT || 5000
const start = async () => {
   try {
  connectDb(MONGO_URI)
    app.listen(port,() => {
        console.log('sever running');
    })
   } catch (error) {
console.log(error);
 }
 }
 start()
