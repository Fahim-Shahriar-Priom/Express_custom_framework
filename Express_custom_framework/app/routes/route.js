var authRoute = require('./api/auth/authRoute');
var mongoRoute = require('./api/analytics/route');
var usersRoute = require('./api/user/route');
var indexRoute = require('./web/view/indexRoute');

module.exports.API =
{
    authRoute,
    mongoRoute,
    usersRoute,
    indexRoute
}