exports.isAuthenticated = (req, res, next) => {
    const { id, password } = req.body;
    if (id !== 1 || password !== 1) {
        return res.status(401).json({
            message: "Authentication required."
        })
    }
    next();
};

exports.isAuthorized = (req, res, next) => {
    const { adminPassword } = req.body;
    if (adminPassword !== 101) {
        return res.status(401).json({
            message: "Admin level Authorization required."
        })
    }
    next();
};