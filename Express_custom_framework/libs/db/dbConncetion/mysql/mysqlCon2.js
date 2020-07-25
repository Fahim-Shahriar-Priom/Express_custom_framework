
// 'user strict';
// const config = require('config');
// var  mysql = require('mysql');
// const logger = require('../../helper/logger');



// const DBOptions = {
//    host: config.get('MYSQL.HOST'),
//    user: config.get('MYSQL.USER'),
//    password: config.get('MYSQL.PASSWORD'),
//    database: config.get('MYSQL.DATABASE'),
//    dialect: config.get('MYSQL.DIALECT'),
//    pool: {
//        min: 0,
//        max: 100,
//    }
// };
// // var connection;
// function createConnection()
// {
//     var connection = mysql.createConnection(
//     {
//         host: DBOptions.host,
//         user: DBOptions.user,
//         password: DBOptions.password,
//         database: DBOptions.database,
//         dialect: DBOptions.dialect,
//         timezone: "Asia/Dhaka",
//         define: { timestamps: false },
//         pool:   {
//                     max: 100,
//                     min: 0,
//                     acquire: 30000,
//                     //idle: 20000,
//                 },
//     });
//     logger.info("Opening connection to MySql DB" + connection);
//     return connection;
// }
// exports.createConnection = createConnection;
// exports.mysql = mysql;