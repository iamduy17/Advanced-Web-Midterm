const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const session = require('express-session');
const bcrypt = require('bcryptjs');
const authModel = require('../models/authModel'); 
const {AuthenticationError} = require('../utils/index');
const config = require('../config/index');

module.exports = (app) => {
    //--------- PASSPORT-LOCAL ---------//
    passport.use(
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true,
            },
            async (req, email, password, done) => {
                let user;
                try {
                    user = await authModel.getUserByProvider(email, 'local');                
                    
                    if (!user) {
                        return done(null, false, {
                            message: 'Your email is incorrect!',
                            err: AuthenticationError.Wrong_Username,
                        });
                    }

                    const challengeResult = await bcrypt.compare(password, user.password);
                    if (!challengeResult) {
                        return done(null, false, {
                            message: 'Your password is incorrect!',
                            err: AuthenticationError.Wrong_Password,
                        });
                    }

                    req.user = user;
                    return done(null, user);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    //--------- PASSPORT-JWT ---------//
    var opts = {
        jwtFromRequest:  ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.JWTInfo.JWTSecretKey,
        issuer : config.JWTInfo.JWTIssuer,
        audience : config.JWTInfo.JWTAudience
    }
    passport.use(new JwtStrategy(opts, async (req, jwt_payload, done) => {
        try {
            const {email, provider} = jwt_payload.data;
            let user = await authModel.getUserByProvider(email, provider);

            if (user) {
                req.user = user;
                done(null, jwt_payload.data);
            }
            else 
                done(null, false, {
                    err: AuthenticationError.Account_Not_Exist,
                    message: "Email not found."
                });
        
        } catch (error) {
            done(error);
        }
    }));

    //--------- PASSPORT-GOOGLE ---------//
    passport.use(new GoogleStrategy({
        clientID:     config.GoogleInfo.GOOGLE_CLIENT_ID,
        clientSecret: config.GoogleInfo.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (request, accessToken, refreshToken, profile, done) => {
        try {
            let user = await authModel.getUserByProvider(profile.email, 'google');
        
            if(!user) {
                let userCreate = await authModel.add({
                    username: profile.displayName,
                    email: profile.email,
                    password: null,
                    external_id: profile.id,
                    is_activated: true,
                    provider: "google"
                });     
          
                return done(null, userCreate);
            }
 
            return done(null, user);
        } catch (error) {
            done(error);
        }
      }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(async (user, done) => {
        try {
            const u = await authModel.getUserByProvider(user.email, user.provider);
            done(null, u);
        } catch (error) {
            done(error);
        }
    });

    app.use(
        session({
          secret: "web",
          resave: false,
          saveUninitialized: true,
        })
    );

    app.use(passport.initialize());
    app.use(passport.session());
};
