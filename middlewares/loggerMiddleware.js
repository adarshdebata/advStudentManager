const loggerMiddleware = (req, res, next) => {
    console.log(`${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`);
    next();
};

module.exports = loggerMiddleware;