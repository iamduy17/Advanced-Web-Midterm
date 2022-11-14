const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// module.exports = (app) => {
//     passport.use(
//         new LocalStrategy(
//             {
//                 usernameField: 'Username',
//                 passwordField: 'Password',
//                 passReqToCallback: true,
//             },
//             async (req, username, password, done) => {
//                 let user;
//                 try {
//                     user = await userM.get(username);                
                    
//                     if (!user) {
//                         return done(null, false, {
//                             message: 'Nhập sai tên tài khoản!',
//                             err: 1,
//                         });
//                     }

//                     const challengeResult = await bcrypt.compare(
//                         password,
//                         user.Password
//                     );
//                     if (!challengeResult) {
//                         return done(null, false, {
//                             message: 'Nhập sai mật khẩu!',
//                             err: 2,
//                         });
//                     }

//                     return done(null, user);
//                 } catch (error) {
//                     return done(error);
//                 }
//             }
//         )
//     );

//     passport.serializeUser(function (user, done) {
//         done(null, user);
//     });

//     passport.deserializeUser(async (user, done) => {
//         try {
//             const u = await userM.get(user.Username);
//             done(null, u);
//         } catch (error) {
//             done(error);
//         }
//     });

//     app.use(passport.initialize());
// };
