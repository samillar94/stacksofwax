 
const ErrorHandler = (err, req, res, next) => {

    console.log("API error handler responding with an error status.");
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'API error handler responding with an error status.';
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg
    });
    
};

module.exports = ErrorHandler;