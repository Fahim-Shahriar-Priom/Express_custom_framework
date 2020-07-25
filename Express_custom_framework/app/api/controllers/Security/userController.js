'use strict';

const UserModel = require('../../model/Security/userModel');
var mongodb = require('../../../../libs/db/dbConncetion/mongo/mongoCon');
const BaseModel = require('../../model/baseModel');
const utility = require('../../../../libs/utility/validation');
const logger = require('../../../../libs/helper/logger');
const { Helper } = require('../../../../libs/helper');
const crypto = require('crypto');
const Joi = require('joi');



var controllerName = Helper.getFileName(__filename, __dirname);
//logger.info("Writing from the user controler, Get controller name " + controllerName);

exports.create_user = function (req, res) {
  //using object distructon
  logger.info("Creating new user from User API")
  const { error } = utility.validateUser(req.body);
  var new_user = req.body;
  if (error) {
    logger.info("Error Creating user from User API" + error.details[0].message)
    res.status(400).send(error.details[0].message);
  }


  else {

    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt)
      .update(new_user.password)
      .digest("base64");
    new_user.password = salt + "$" + hash;
    // making uniqe key
    //new_user.id = BaseModel.makeUniqueKeyForMaster("Users",1,"U");
    new_user.id = 1;
    new_user.created_at = new Date();
    new_user.updated_at = new Date();
    //this.deleted_at = null;
    UserModel.createUser(new_user, function (err, user) {
      if (err) {
        logger.log("Error Creating user from User API" + err.message)
        res.send(err);
      }
      else {
        res.json(user);
      }
    });
  }
};


exports.get_a_user = function (req, res) {
  UserModel.getUserById(req.params.userId, function (err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.patch_user = function (req, res) {
  if (req.body.password) {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    req.body.password = salt + "$" + hash;
  }
  UserModel.patchUserById(req.params.userId, new UserModel(req.body), function (err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.delete_a_user = function (req, res) {
  UserModel.remove(req.params.userId, function (err, user) {
    if (err)
      res.send(err);
    res.json({ message: 'User successfully deleted' });
  });
};

//#region Getting All User

exports.listAllUsers = function (req, res) {
  logger.info("Retriving users list from User API")
  let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  let page = 0;
  let skip = 0;
  if (req.query) {
    if (req.query.page) {
      page = parseInt(req.query.page);
      page = Number.isInteger(page) ? page : 0;
      skip = limit * page;
    }
  }

  UserModel.getAllUser(limit, skip, function (err, result) {
    if (err) {
      logger.info("Error Retriving users list from User API" + err.message)

      res.send(err);
    }
    else {
      console.log('res', result);
      res.status(200).send(result);
    }
  });
}
//#endregion

//#region Getting All Mongo Collection
exports.listAllMongoCollection = function (request, response) {
  mongodb.mongoConncection.listCollections({}).toArray(function (err, collections) {
    assert.equal(null, err);
    collections.forEach(function (collection) {
      console.log(collection);
    });
  })
  response.send('See console for a list of available collections');
}
//#endregion