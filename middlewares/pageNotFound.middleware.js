const logger = require("../utils/logger")


const pageNotFound = (req, res, next) => {
    try {
        let error = new Error()
        error.status = 404
        logger.warn('Error 404')
        res.status(404).redirect('/notFound')
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error(error)
    }
}

module.exports = pageNotFound