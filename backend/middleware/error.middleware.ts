const ApiError = require('../exeptions/api-error')

module.exports = function (err, req,res,next) {
    console.log(err)
    if(err instanceof ApiError) {
        return res.status(err.status).json({message: err.message, error: err.error})
    }
    return res.status(500).json({message: "Something bad happened!"})
}