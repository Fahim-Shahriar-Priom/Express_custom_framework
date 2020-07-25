'use strict';

const path = require('path');

const indexRoute = function (app)
 {
    app.get('/index',(req, res, next) => {
        res.sendFile(path.join(__dirname, '../../../', 'web/views', 'index.html'));
    })
};

module.exports ={ indexRoute };