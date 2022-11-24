require('dotenv').config();

exports.JWTInfo = {
    JWTSecretKey: process.env.JWTSecretKey,
    JWTIssuer: process.env.JWTIssuer,
    JWTAudience: process.env.JWTAudience
}

exports.saltRounds = process.env.SALT_ROUND;
exports.CLIENT_URL=process.env.CLIENT_URL;

exports.GoogleInfo = {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
}

exports.EmailInfo = {
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_SERVICE: process.env.EMAIL_SERVICE,
    EMAIL_PORT: process.env.EMAIL_PORT,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS
}