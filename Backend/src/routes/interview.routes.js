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

/**
 * @route GET /api/ai/reports/:reportId
 * @description get prepPlan report by reportId
 * @access private
 */
interviewRouter.get('/reports/:reportId', authMiddleware.authUser, interviewController.getReportByIdController)


/**
 * @route GET /api/ai
 * @description get all report for current user
 * @access private
 */
interviewRouter.get('/', authMiddleware.authUser, interviewController.getAllReportController)

/**
 * @route GET /api/ai/resume/pdf/:reportId
 * @description generate resume pdf for current reportid
 * @access private
 */
interviewRouter.get('/resume/pdf/:reportId', authMiddleware.authUser, interviewController.generateResumePdfController)

module.exports = interviewRouter;