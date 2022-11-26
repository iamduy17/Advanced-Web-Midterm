const passport = require("passport");
const {CLIENT_URL} = require('../config/index');

exports.PassportLocalCheckLogin = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if(err) {
            return next(err);
        }

        if(!user && info) {
            return res.send({
                ReturnCode: info.err,
                Message: info.message
            });
        }

        req.user = user;
        next();
    })(req, res, next);
}

exports.PassportJWTCheckToken = (req, res, next) => {
    passport.authenticate("jwt", {session: false}, (err, user, info) => {

        if(err) {
            next(err);
        }

        if(!user && info) {
            return res.send({
                ReturnCode: info.err,
                Message: info.message
            })
        }

        req.user = user;
        next();
    })(req, res, next);
}

// exports.PassportGoogleCheck = (req, res, next) => {
//     passport.authenticate("google", {
//         session: false,
//         successRedirect: CLIENT_URL,
//         failureRedirect: '/auth/google/failure'
//     }, (err, user, info) => {

//         if(err) {
//             next(err);
//         }

//         if(!user && info) {
//             return res.send({
//                 ReturnCode: info.err,
//                 Message: info.message
//             })
//         }

//         req.user = user;
//         next();
//     })(req, res, next);
// }