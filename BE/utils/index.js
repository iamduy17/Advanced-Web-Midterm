const jwt = require('jsonwebtoken');
const config = require('../config/index');

exports.GenerateToken = (id, email, provider) => {
    return jwt.sign({
        data: {
            id: id,
            email: email,
            provider: provider
        }
    }, config.JWTInfo.JWTSecretKey,
        {
            expiresIn: '1h',
            issuer: config.JWTInfo.JWTIssuer,
            audience: config.JWTInfo.JWTAudience
        });
}

exports.validateEmail = (email) => {
    var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
};

exports.AuthenticationError = {
    Account_Not_Exist: 2,
    Account_Already_Exist: 3,
    Wrong_Username: 4,
    Wrong_Password: 5,
    Email_Not_Valid: 6,
    Email_Not_Verify: 7,
    JWT_Expired: 8,
    Error: 9999
}