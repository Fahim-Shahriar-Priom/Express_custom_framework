const Joi = require('joi');

const  errorPlaceHolder = (status, success, message, data) => ({
    status,
    success,
    message,
    data
});
const  placeHolder = (success, message, data) => ({
    success,
    message,
    data
});

var ValidateEmail =function(mailAddress)
{
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*utility(\.\w{2,3})+$/;
    if(mailAddress.match(mailformat))
    {
        return true;
    }
    else
    {
        return false;
    }
}
function validateUser(user)
{
    var schema =
    {     
        email : Joi.string().email().required(),
        password : Joi.string().min(5).required(),
        username : Joi.string().min(2).required(),
        status : Joi.required()
    };
    var dataToValidate =
    {     
        email : user.email,
        password : user.password,
        username : user.username,
        status : user.status
    };
    return result =Joi.validate(dataToValidate,schema);
}




const isDefined = (value) => typeof value !== 'undefined' && value !== null;

const baseFilter = (reqBody, Model, localWhere) => {

    const where = localWhere ? localWhere : {};
    const modelAttributes = Object.keys(Model.rawAttributes);

    modelAttributes.map((attr) => {

        if (reqBody[attr]) {

            where[attr] = reqBody[attr];

        }

    });

    return where;

};

var getFileName = function(filename, dirname) 
{
    return filename.substring(dirname.length + 1, filename.lastIndexOf('.'));
}

module.exports = {
    ValidateEmail,
    validateUser,
    getFileName,
    baseFilter,
    isDefined
}