const express = require('express')
const errorHandler = require('./middlewars/error-handler')
const app = express()
const notFound = require('./middlewars/not-found')
require('dotenv').config()
app.use(express.json())


app.get('/',(req,res)=>{
res.send('<h1>Store Api </h1> <a href="/api/v1/products" >Api route</a>')
})

app.use(notFound)
app.use(errorHandler)
const port = process.env.PORT || 5000
const start = async () => {
   try {
    app.listen(port,() => {
        console.log('sever running');
    })
   } catch (error) {

 }
 }
 start()
