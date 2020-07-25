const VerifyUserMiddleware = require('./validate/verifyUser');
const AuthorizationController = require('./validate/authenticate');
const AuthValidationMiddleware = require('./../../../../common/middleware/authValidation');
const logger = require('./../../../../libs/helper/logger');
var authRoute = function (app) {

    app.post('/auth', [
        //logger.info()
        VerifyUserMiddleware.hasAuthValidFields,
        VerifyUserMiddleware.isPasswordAndUserMatch,
        AuthorizationController.login
    ]);

    app.post('/auth/refresh', [
        AuthValidationMiddleware.validJWTNeeded,
        AuthValidationMiddleware.verifyRefreshBodyField,
        AuthValidationMiddleware.validRefreshNeeded,
        AuthorizationController.login
    ]);
};
module.exports = {authRoute}
