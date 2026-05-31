const pdfParse = require('pdf-parse')
const generateInterviewReport = require('../ai/services/ai.service')
const interviewReportModel = require('../models/inteviewReport.model')

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

module.exports = {
    generateReportController
}