const express = require("express");
const { Router } = express;
const router = Router();

const logger = require("../utils/logger");

router.get('/notFound', async (req,res) =>{    
    try{
        logger.info('GET /notFound' )
        res.status(200).render('notFound')
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error(error)
    }
})


module.exports = router;