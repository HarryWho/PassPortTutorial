var express = require('express');
var router = express.Router();

router.get('/register',(req, res, next)=>{
    res.render('register');
});

router.post('/register',(req, res, next)=>{
    var userregisterdetails ={
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        password2: req.body.password2
    };
    //console.log(userregisterdetails.username);
    req.checkBody(userregisterdetails.username, "Name is required").notEmpty();
    req.checkBody(userregisterdetails.email, "Email is required").notEmpty();
    req.checkBody(userregisterdetails.email, "Email is not valid").isEmail();
    req.checkBody(userregisterdetails.password, "Password is required").notEmpty();
    req.checkBody(userregisterdetails.password2, "Passwords do not match").equals(userregisterdetails.password)

    var errors = req.validationErrors(true);
    if(errors){
        res.render('register',{
            errors:errors
        });
    }else{

    }
    //res.end();
});

router.get('/login',(req, res, next)=>{
    res.render('login');
});
router.post('/login',(req, res, next)=>{
    res.send('We will process the form in here');
});
module.exports = router;