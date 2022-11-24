const passport = require("passport");

exports.PassportLocalCheckLogin = (req, res, next) => {
    passport.authenticate("local", {session: false}, (err, user, info) => {
        if(err) {
            return next(err);
        }

        if(!user && info) {
            return res.send({
                'ReturnCode': info.err,
                'Message': info.message
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
                'ReturnCode': info.err,
                'Message': info.message
            })
        }

        req.user = user;
        next();
    })(req, res, next);
}