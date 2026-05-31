const express = require('express')
const interviewRouter = express.Router();
const authMiddleware = require('../middlewares/auth.middleware')
const interviewController = require('../controller/interview.controller')
const upload = require('../middlewares/file.middleware')




/**
 * @route POST /api/ai
 * @description generate new interview report on the basis of user self descrption
 * @access private
 */
interviewRouter.post('/', authMiddleware.authUser, upload.single('resume'), interviewController.generateReportController)


module.exports = interviewRouter;