const express = require('express');
const router = express.Router();
const db = require('../models')
const passport = require('../config/ppConfig');

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.post('/signup', (req,res) =>{
  console.log(req.body);
  db.user.findOrCreate({
    where: { email: req.body.email},
    defaults: { 
      name: req.body.name,
      password:req.body.password
  }
})
  .then(([user, created])=> {
    if (created) {
    // if created, success and redirect to home
      console.log(`${user.name} was created`)
      // Flash Message 
      passport.authenticate('local', {
        successRedirect: '/',
        successFlash: 'Account created and logging in'
      })(req, res);
      //before passport authenticate 
      // res.redirect('/');
    } else {
      // email already exist
      console.log('Email already exist')
      // FLASH 
      req.flash('error','Email already exist. Please try again')
      res.redirect ('/auth/signup')

    }
  })
  .catch(error => {
    console.log('Error', error);
    req.flash('error',`Error, unfortunately... ${error}`)
    res.redirect('/auth/signup')

  })
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  successFlash: 'Welcome back',
  failureFlash: 'Either email or password is incorrect'
}));

router.post('/login', (req, res) => {


})

router.get('/logout', (req,res) => {
  req.logout();
  req.flash('success','See you soon')
  res.redirect('/');
})



module.exports = router;
