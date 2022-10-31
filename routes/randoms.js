const express = require("express");
const { Router } = express;
const router = Router();

/* --------- fork  ------------ */
const { fork } = require('child_process');
const puerto = require("../config/puerto");
const logger = require("../utils/logger");

/* ---------    ------------ */
router.get('/api/randoms/:cant', async (req,res) =>{    
    try{     
        logger.info(`GET /randoms:cant | process: ${process.pid}, puerto: ${puerto}`)   
        const childProcess = fork('./childProcess/randoms.js')
        const cantidad = Number(req.params.cant) || 100000000
        childProcess.send(cantidad)
        childProcess.on('message', mensaje =>{
            res.status(200).json(mensaje)
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error(error)
    }
})
router.get('/api/randoms', async (req,res) =>{    
    try{
        logger.info(`GET /randoms | process: ${process.pid}, puerto: ${puerto}`)   
        const cantidad = 100000000
        const childProcess = fork('./childProcess/randoms.js')
        childProcess.send(cantidad)
        childProcess.on('message', mensaje =>{
            res.status(200).json(mensaje)
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error(error)
    }
})

module.exports = router;