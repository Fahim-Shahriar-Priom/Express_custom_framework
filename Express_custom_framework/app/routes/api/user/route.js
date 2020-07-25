'use strict';

const UsersController = require('../../../api/controllers/Security/userController');
const PermissionMiddleware = require('../../../../common/middleware/authPermission');
const ValidationMiddleware = require('../../../../common/middleware/authValidation');
const config = require('../../../../common/config/env.config');

const userRoute = function (app)
 {
    app.post('/analytics/users', [
        UsersController.create_user
    ]);
    app.get('/analytics/users', [
        //ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        UsersController.listAllUsers
    ]);
    app.get('/analytics/listAllUsers', [
      //ValidationMiddleware.validJWTNeeded,
      //PermissionMiddleware.minimumPermissionLevelRequired(PAID),
      UsersController.listAllUsers
  ]);
    app.get('/analytics/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.minimumPermissionLevelRequired(FREE),
       // PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        UsersController.get_a_user
    ]);
    app.patch('/analytics/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
       // PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        //PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        UsersController.patch_user
    ]);
    app.delete('/analytics/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        UsersController.delete_a_user
    ]);
    app.delete('/analytics/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        UsersController.delete_a_user
    ]);

    app.get('/analytics/', [
        UsersController.listAllMongoCollection
    ]);
};

module.exports ={userRoute};