const errorHandler = async (er,req,res,next) => {
console.log(er);
return res.status(400).json({message : 'somthing went wrong.try again'})
}

module.exports = errorHandler
