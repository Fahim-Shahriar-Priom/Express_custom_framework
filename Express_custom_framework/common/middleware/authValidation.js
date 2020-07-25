const jwt = require('jsonwebtoken'),
secret = require('../config/env.config.js').jwt_secret,
crypto = require('crypto');
const request = require("request");

exports.verifyRefreshBodyField = (req, res, next) => {
    if (req.body && req.body.refresh_token) {
        return next();
    } else {
        return res.status(400).send({error: 'need to pass refresh_token field'});
    }
};

exports.validRefreshNeeded = (req, res, next) => {
    let b = new Buffer(req.body.refresh_token, 'base64');
    let refresh_token = b.toString();
    let hash = crypto.createHmac('sha512', req.jwt.refreshKey).update(req.jwt.userId + secret).digest("base64");
    if (hash === refresh_token) {
        req.body = req.jwt;
        return next();
    } else {
        return res.status(400).send({error: 'Invalid refresh token'});
    }
};


exports.validJWTNeeded = (req, res, next) =>
{
    if (req.headers['authorization']) 
    {
        try 
        {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send();
            } else {
                req.jwt = jwt.verify(authorization[1], secret);
                return next();
            }

        } catch (err) {
            return res.status(403).send();
        }
    } else {
        return res.status(401).send();
    }
};

exports.validJWTForExistingPhPToken = (req, res, next) =>
{
   //only forexisting system
    const secret = 'AEYjGNIRVGEtKSIarg0zCMEzOoNsKbxzzAFjTZWCrNfRaKHrOZ0gYf66cqRDcYrKFtv9Hp6J8NU3kh7xb47V4JvTGKGARAMhngqfcn7T63W7iCyvolcoaqRIw0Vi1aarol8902r5c1ss';
   
   //secret = "0vwFYqkSzazDSVvBdX08_TOVrdWo6I5hsMm"
   if (req.headers['authorization'])
   {
       try
       {
           let authorization = req.headers['authorization'].split(' ');
           if (authorization[0] !== 'Bearer') {
               return res.status(401).send();
           } else {
               req.jwt = jwt.verify(authorization[1], secret);
               return next();
           }
       } catch (err) {
           return res.status(403).send("Token authorization failled");
       }
   } else {
       return res.status(401).send("Token Not Found");
   }
};

exports.validJWTForExistingPhPTokenFromOutside = (req, res, next) =>
{
    
    if (req.headers['authorization'])
        {
        const options = {
            url: 'https://n.trucklagbe.com/api/24/jwtVarification',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': req.headers['authorization']
            }
        };

        request(options, function (err, resp, body) 
        {
            if (err) {
                res.json("ERROR :" + err);
            }
            else {
                req.jwt = resp.body;
                //console.log(resultMessage);
                //res.send([resultMessage]);
                //return next();
                if(req.jwt!=null){
                    if(req.jwt=="Token Not Found"){
                        return res.status(401).send("Token Not Found");  
                    }
                    else if (req.jwt=="Token authorization failled"){
                        return res.status(403).send("Token authorization failled"); 
                    }
                    else{
                        return next(); 
                    }
                    
                }
                else{
                    return res.status(200).send("Varification Function Failed"); 
                }
            }
        });
    }
    else {
        return res.status(401).send("Token Not Found");
    }
};
        
        