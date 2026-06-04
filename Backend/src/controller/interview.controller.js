const pdfParse = require('pdf-parse')
const aiService = require('../ai/services/ai.service')
const interviewReportModel = require('../models/inteviewReport.model')

/**
 * @description controller to generate preparation plan bases on user inputs
 * @param {*} req 
 * @param {*} res 
 */
async function generateReportController(req, res) {
    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const { selfDescription, jobDescription } = req.body
    
    const prepPlanByAi = await aiService.generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
    })
    const safeData = sanitizeInterviewReport(prepPlanByAi);
    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...safeData
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
            message: `Prep plan for this report id [${reportId}] not found`
        })
    }

    res.status(200).json({
        message: `Prep plan for this report id [${reportId}] found`,
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
    }).sort({ createdAt: -1}).select("-resume -selfDescription -jobDescription -__v")

    if(!reports) {
        return res.status(404).json({
            message: `No reports found`
        })
    }

    res.status(200).json({
        message: `Reports fetched successfully`,
        reports
    })
}

module.exports = {
    generateReportController,
    getReportByIdController,
    getAllReportController
}

function sanitizeInterviewReport(data) {
  if (!data || typeof data !== "object") {
    throw new Error("Invalid AI data: not an object");
  }

  // ---------- SAFE STRING ----------
  const safeString = (val, fallback = "N/A") =>
    typeof val === "string" && val.trim() ? val.trim() : fallback;

  // ---------- SAFE NUMBER ----------
  const safeNumber = (val, fallback = 0) => {
    const num = Number(val);
    return Number.isFinite(num) ? num : fallback;
  };

  // ---------- FIX QUESTION OBJECT ----------
  const fixQuestion = (q) => {
    if (typeof q === "string") {
      return {
        question: q,
        intention: "Not provided",
        answer: "Not provided",
      };
    }

    if (typeof q === "object" && q !== null) {
      return {
        question: safeString(q.question),
        intention: safeString(q.intention),
        answer: safeString(q.answer),
      };
    }

    return {
      question: "Unknown question",
      intention: "Not provided",
      answer: "Not provided",
    };
  };

  // ---------- FIX SKILL GAP ----------
  const fixSkillGap = (s) => {
    if (typeof s === "string") {
      return {
        skill: s,
        severity: "low",
      };
    }

    if (typeof s === "object" && s !== null) {
      return {
        skill: safeString(s.skill),
        severity: ["low", "medium", "high"].includes(s.severity)
          ? s.severity
          : "low",
      };
    }

    return { skill: "Unknown", severity: "low" };
  };

  // ---------- FIX PLAN ----------
  const fixPlan = (p, index) => {
    if (typeof p === "string") {
      return {
        day: index + 1,
        focus: p,
        tasks: [p],
      };
    }

    if (typeof p === "object" && p !== null) {
      return {
        day: safeNumber(p.day, index + 1),
        focus: safeString(p.focus),
        tasks: Array.isArray(p.tasks)
          ? p.tasks.map((t) => safeString(t))
          : [],
      };
    }

    return {
      day: index + 1,
      focus: "Preparation",
      tasks: [],
    };
  };

  // ---------- MAIN FIX ----------
  const fixed = {
    matchScore: safeNumber(data.matchScore),
    jobTitle: safeString(data.jobTitle, "Unknown Role"),

    technicalQuestions: Array.isArray(data.technicalQuestions)
      ? data.technicalQuestions.map(fixQuestion).slice(0, 7)
      : [],

    behavioralQuestions: Array.isArray(data.behavioralQuestions)
      ? data.behavioralQuestions.map(fixQuestion).slice(0, 7)
      : [],

    skillGaps: Array.isArray(data.skillGaps)
      ? data.skillGaps.map(fixSkillGap).slice(0, 5)
      : [],

    preparationPlan: Array.isArray(data.preparationPlan)
      ? data.preparationPlan.map(fixPlan).slice(0, 7)
      : [],
  };

  return fixed;
}