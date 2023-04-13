 
const ErrorHandler = (err, req, res, next) => {

    console.log("App error handler responding with an error status.");
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Something went wrong';
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg
    });
    
};

module.exports = ErrorHandler;