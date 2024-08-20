const logRequest = (req,res,next) =>{
    console.log(`${req.method} request made to ${req.originalUrl}`);
    next();
}

module.exports = logRequest