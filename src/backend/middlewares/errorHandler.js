module.exports = {
    handleErrors: (error, request, response, next) => {
        response.status(error.statusCode).json({
            message: error.message,
        });
    },
    notFound: (request, response, next) => {
        next({
            message: `${request.originalUrl} not found`,
            statusCode: 404,
        });
    },
};
