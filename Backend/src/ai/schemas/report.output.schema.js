const { z } = require("zod");

const interviewReportOutputSchema = z.object({
    matchScore: z.number().describe("Overall compatibility score between candidate and job role from 0 to 100"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("Technical interview question"),
        intention: z.string().describe("What the interviewer wants to evaluate through this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("Behavioral interview question"),
        intention: z.string().describe("What personality trait or behavior is being evaluated"),
        answer: z.string().describe("Recommended strategy and talking points for answering")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("Missing or weak skill relevant to the target role"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    jobTitle: z.string().describe("The title of the job for which the interview report is generated"),
}).strict();

const resumeExperienceSchema = z.object({
  company: z.string().min(1).describe("Company or organization name"),
  role: z.string().min(1).describe("Job title or role held"),
  duration: z.string().min(1).describe("Employment duration or date range"),
  highlights: z.array(z.string().min(1)).describe("Achievement bullets for this experience")
}).strict();

const resumeProjectSchema = z.object({
  name: z.string().min(1).describe("Project name"),
  description: z.string().min(1).describe("Short project summary"),
  highlights: z.array(z.string().min(1)).describe("Key contributions or outcomes for the project")
}).strict();

const resumeStructuredSchema = z.object({
  name: z.string().min(1).describe("Candidate name"),
  summary: z.string().min(1).describe("Professional summary for the resume"),
  skills: z.array(z.string().min(1)).describe("Core technical and professional skills"),
  experience: z.array(resumeExperienceSchema).describe("Work experience entries"),
  projects: z.array(resumeProjectSchema).describe("Project entries")
}).strict();

module.exports = {
  interviewReportOutputSchema,
  resumeStructuredSchema
};