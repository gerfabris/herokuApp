const express = require("express");
const checkAuth = require("../middlewares/auth.middleware.js");
const logger = require("../utils/logger.js");
const { Router } = express;
const passport = require('./passport.js');

const router = Router();

router.get('/', checkAuth ,(req,res)=>{
    try {
        logger.info('GET /home')
        if(req.user){
            let username = req.user.userEmail;
            res.render('home',{username:username});
        }else{
            res.redirect('/login');
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error(error)
    }
});

router.post('/', checkAuth , async (req, res) =>{
    const logout = !req.body
    try{
        logger.info('POST /home')
        if(!logout){
            res.status(200).redirect('/logout' )
        }
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error(error)
    }
})

module.exports = router;