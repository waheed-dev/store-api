const mongoose = require('mongoose')

const connectDb = (uri) => {
 return mongoose.connect(uri,{ useNewUrlParser: true })
}

module.exports = connectDb
