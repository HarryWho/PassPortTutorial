var express = require('express');
var router = express.Router();

router.get('/', isAuthenticated, (req, res, next)=>{
    res.render('index');
});

function isAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        req.flash('error_msg', "You are not Authorised to see this page! Please login");
        res.redirect('/users/login');
    }
}

module.exports = router;