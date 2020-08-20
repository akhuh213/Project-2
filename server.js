require('dotenv').config();
const db = require('./models');
const express = require('express');
const methodOverride = require('method-override')
const layouts = require('express-ejs-layouts');
const { default: Axios } = require("axios");
const app = express();
const session = require('express-session')
const SECRET_SESSION = process.env.SECRET_SESSION;
const passport = require('./config/ppConfig')
const flash = require('connect-flash')

//require the authorization middleware at the top of the page 
const isLoggedIn = require('./middleware/isLoggedIn');
const { query } = require('express');


let API_KEY = process.env.EDAMAM_API_KEY
let API_ID = process.env.EDAMAM_API_ID



app.set('view engine', 'ejs');


app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);
app.use(methodOverride('_method'))


// secret: What we giving the user to use our site / session cookie 
// resave: Save the session even if it's modified, make this false 
// saveUninitiatalized: if we have a new session, we'll save it, therefore, 
// setting this to true 

app.use(session({
  secret: SECRET_SESSION,
  resave: false,
  saveUninitialized: true
}))
// Make sure put this under session 
app.use(passport.initialize())
app.use(passport.session())

// flash for temporary message to the user (error message to users)
app.use(flash());


// middleware to have our message accessible for every view
app.use((req, res, next) => {
// before every route, we will attached our current user to res.local 
res.locals.alerts = req.flash();
res.locals.currentUser = req.user;
next();
})


app.get('/', (req, res) => {
  res.render('index', { alerts:res.locals.alerts })
  
});

app.get('/profile', isLoggedIn, (req, res) => {
  
res.render('profile', { user: req.user})
  
});

app.get('/', function(req,res){
  res.render('index')
})

app.use('/auth', require('./routes/auth'));
app.use('/results', require ('./routes/result'));
app.use('/myrecipe', require ('./routes/myrecipe'));
app.use('/calorielog', require('./routes/calorielog'))
app.use('/calsearch', require('./routes/calorielog'))










const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${port} 🎧`);
});

module.exports = server;
