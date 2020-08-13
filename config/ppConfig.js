const passport = require('passport');
const localstrategy = require('passport-local').Strategy;
const db = require('../models');

/* Passport "serialize" your info make it easier to login 
- Convert the user based on the id 
*/

passport.serializeUser((user, cb) =>{
    cb(null, user.id)
})

//passport "deserializeUser" is going to take the id and look that up in the database 

passport.deserializeUser((id, cb) => {
    cb(null, id)
    .catch(cb());
})

passport.use(new localstrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, cb) => {
    db.user.findOne({
        where: { email }
    })
    .then(user => {
        if (!user || !user.validPassword (password)) {
            cb(null, false);
        }else {
            cb(null, user);
        }
    })
    .catch(cb());
}
))

