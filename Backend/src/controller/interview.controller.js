const pdfParse = require('pdf-parse')
const generateInterviewReport = require('../ai/services/ai.service')
const interviewReportModel = require('../models/inteviewReport.model')

/**
 * @description controller to generate preparation plan bases on user inputs
 * @param {*} req 
 * @param {*} res 
 */
async function generateReportController(req, res) {
    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const { selfDescription, jobDescription, userPrompt } = req.body
    
    const aiResponse = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        userPrompt
    })

    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...aiResponse
    })

    res.status(201).json({
        message: 'Interview report generated successfully',
        interviewReport
    })
}

/**
 * @description Controller to get prep-plan-report by id
 * @param {*} req 
 * @param {*} res 
 */
async function getReportByIdController(req, res) {
    const { reportId } = req.params

    const prepPlan = await interviewReportModel.findOne({
        _id: reportId,
        user: req.user.id
    })

    if(!prepPlan) {
        return res.status(404).json({
            message: `Prep plan for this ${reportId} not found`
        })
    }

    re.status(200).json({
        message: `Prep plan for this ${reportId} found`,
        prepPlan
    })
}

/**
 * @description get all reports for current loggedIn user
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function getAllReportController(req, res) {

    const reports = await interviewReportModel.find({
        user: req.user.id
    }).sort({ createdAt: -1}).select("-resume -selfDescription -jobDescription -__v, -technicalQuestions -behavioralQuestion -skillGaps -preparationPlan")

    if(!reports) {
        return res.status(404).json({
            message: `No reports found`
        })
    }

    re.status(200).json({
        message: `Reports fetched successfully`,
        reports
    })
}

module.exports = {
    generateReportController,
    getReportByIdController,
    getAllReportController
}