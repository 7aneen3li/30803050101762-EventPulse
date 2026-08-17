const AppError = require('../utils/AppError');

function requireRole(...roles) {
    return (req, res, next) => {
        if (!roles.includes(req, UserActivation.role)) {
            return next(new AppError('You do not have permission to perform this action', 403));
        }
        next();
    };
}

module.exports = requireRole;