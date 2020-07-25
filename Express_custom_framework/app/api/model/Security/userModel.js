'user strict';
var connection = require('../../../../libs/db/dbConncetion/mongo/mongoCon');
var logger = require('../../../../libs/helper/logger');
const BaseModel = require('../baseModel');

var User = function(user)
{
    //this.id = CommonEnum.NewMasterID.value;
    this.id = BaseModel.makeUniqueKeyForMaster("Users",1,"U");
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
    this.status = user.status;
    this.created_at = new Date();;
    this.updated_at = new Date();
    this.deleted_at = null;
};
User.createUser = function (newUser, result)
{   
    BaseModel.insertSingleData('Users', newUser,result, function (err, result)
    {
        logger.info("Transaction insertSingleData " + newUser);
        module.exports= User;
        if (err) 
        {
            logger.info("Transaction insertSingleData Eroor " + err);
            con.rollback(con, err);
            result(null, err);
        }
        else 
        {
            con.commit(con);
            result(null, result);          
        }
    });          
};

User.getUserById = function (userId, result)
 {
   console.log(userId);
   var sql = connection.createConnection();
   sql.connect(function (err) 
   {
       if (err) return result(new Error('Failed to connect databse'), null);
       
       logger.info('Getting User From User Model');  

        sql.query("Select * from Users where id = ? " ,[userId],function (err, res) 
        {
            sql.destroy();             
            if(err) 
            {
                console.log("error: ", err);
                result(err, null);
            }
            else
            {
                logger.info('Getting User From User Model Succeed');  

                console.log (userId);
                result(null, res);
                
            }
        });   
    })
};

User.getAllUser = function (limit,skip,result)
 {
    logger.info("Getting User List");
    var query = "Select count(*) as TotalRow from Users"; 
    var sql = connection.createConnection();

    sql.connect(function (err) 
    {
        if (err) return result(new Error('Failed to connect databse'), null);
        
        logger.info('Getting User From User Model'); 
        
        sql.query(query, function(err, rows)
        {
            logger.info("Getting TotalRow from getAllUser method"+rows[0].TotalRow +"  " +skip);
            if(err)
            {
                sql.destroy();

                logger.info("Getting User List error: " + err);
                console.log("error: ", err);

                result(null, err);
            }
            else
            {    
                logger.info("Getting User List : " + rows[0].TotalRow);
                let totalRow = rows[0].TotalRow
                
                sql.query("Select * from Users ORDER BY created_at DESC  limit ? OFFSET ?",[limit,skip],function (err, res) 
                {
                    sql.destroy();
                    if(err)
                    { 
                        logger.info("Getting User List error:"+ err.message);
                        console.log("error: ", err);
                        result(null, err);
                    }
                    else{
                        logger.info("Getting User List : " + rows[0].TotalRow);
                        console.log('use:', res); 

                        
                        var data = Paging(skip,limit,totalRow);
                        res.push("TotalRow:"+totalRow);
                        res.push("Showing:"+data);
                        result( null ,res);
                    }
                }); 
            }
        })  
    })
};
User.patchUserById = function(userId, email, result)
{
    var sql = connection.createConnection();
    sql.connect(function (err) 
    {
        if (err) return result(new Error('Failed to connect databse'), null);
        
        logger.info('Getting User From User Model'); 
        
        sql.query("UPDATE Users SET email = ? WHERE id = ?", [email, userId], function (err, res) 
        {
            sql.destroy();
            if(err) 
            {
                console.log("error: ", err);
                    result(null, err);
            }
            else
            {   
                result(null, res);
            }
        }); 
    })
};
User.findByEmail = function(email, result)
{
    var sql = connection.createConnection();
    sql.connect(function (err) 
    {
        if (err) return result(new Error('Failed to connect databse'), null);
        
        logger.info('Getting User From User Model');

        sql.query("Select * from p_shipper where phone = ?", [email], function (err, res) 
        {
            sql.destroy();
            if(err)
            {
                console.log("error: ", err);
                result(null, err);
            }
            else
            {   
                result(null, res);
            }
        }); 
    });
};

User.remove = function(userId, callback)
{
    var sql = connection.createConnection();
    sql.connect(function (err) 
    {
        if (err) return callback (new Error('Failed to connect databse'), null);
        
        logger.info('Getting User From User Model');

        sql.query("DELETE FROM Users WHERE id = ?", [userId], function (err, res)
        {

            sql.destroy();
            if(err)
            {
                console.log("error: ", err);
                callback(null, err);
            }
            else

            {

                callback(null, res);
            }
        }); 
    })
};

module.exports= User;