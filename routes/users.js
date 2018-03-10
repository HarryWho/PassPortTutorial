var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


router.get('/register',(req, res, next)=>{
    res.render('register');
});

router.post('/register',(req, res, next)=>{
    var userRegisterInfo = {
       username : req.body.username,
       email : req.body.email,
       password : req.body.password,
       hasValidated : false,
       permission : 1
    };
   
    //console.log(userregisterdetails.username);
    // req.checkBody(userRegisterInfo.username, "Name is required").notEmpty();
    // req.checkBody(userRegisterInfo.email, "Email is required").notEmpty();
    // req.checkBody(userRegisterInfo.email, "Email is not valid").isEmail();
    // req.checkBody(userRegisterInfo.password, "Password is required").notEmpty();
    // req.checkBody(userRegisterInfo.password2, "Passwords do not match").equals(userRegisterInfo.password)

    // var errors = req.validationErrors();
    // if(errors){
    //     res.render('register',{
    //         errors:errors
    //     });
    // }else{
        var newUser = new User(userRegisterInfo);
        User.createUser(newUser, function(err, user){
            if(err) throw err;
            console.log(user);
        });

        req.flash('success_msg', 'You are now registered on this site');
        res.redirect('/users/login');
    // }
    //res.end();
});

router.get('/login',(req, res, next)=>{
    res.render('login');
});

passport.use(new LocalStrategy(
    function(username, password, done) {
      User.getUserByUsername(username, function(err, user){
        if(err) throw err;
        if(!user){
            return done(null,false,{message: 'Unknown username'});
        }
        User.comparePassword(password, user.password, function(err, isMatch){
            if(err) throw err;
            if(!isMatch){
                return done(null,false,{message: "Incorrect Pasword"});
            }else{
                return done(null,user);
            }
        });
      });
}));

router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login', failureFlash:true}),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/');
  });

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
      done(err, user);
    });
  });
router.get('/logout',function(req,res){
    req.logout();
    req.flash('success_msg', 'You are now logged out');
    res.redirect('/users/login');
});
module.exports = router;