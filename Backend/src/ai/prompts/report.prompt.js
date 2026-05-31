function buildInterviewReportPrompt({
  resume,
  jobDescription,
  selfDescription,
  userPrompt,
}) {
  return `
You are an expert technical interviewer, hiring manager, and career coach.

Your task is to analyze a candidate profile against a job description and generate a highly realistic interview preparation report.

========================
CANDIDATE RESUME
========================
${resume || "Not Provided"}

========================
CANDIDATE SELF DESCRIPTION
========================
${selfDescription || "Not Provided"}

========================
JOB DESCRIPTION
========================
${jobDescription}

========================
REPORT CUSTOMIZATION
========================
${userPrompt || "None"}

========================
OUTPUT REQUIREMENTS
========================

Return ONLY valid JSON matching this exact schema:

{
  "matchScore": number,
  "summary": string,
  "technicalQuestions": [
    {
      "question": string,
      "intention": string,
      "answer": string
    }
  ],
  "behavioralQuestions": [
    {
      "question": string,
      "intention": string,
      "answer": string
    }
  ],
  "skillGaps": [
    {
      "gap": string,
      "severity": "low" | "medium" | "high",
      "reason": string,
      "recommendation": string
    }
  ],
  "preparationPlan": [
    {
      "day": number,
      "focus": string,
      "tasks": [string]
    }
  ]
}

========================
SCORING RULES
========================

- 90-100 = exceptional fit
- 75-89 = strong fit
- 60-74 = reasonable fit
- 40-59 = weak fit
- below 40 = poor fit

========================
QUESTION RULES
========================

Technical Questions:
- Generate 5 to 7 questions
- Match actual stack and seniority
- Questions must realistically appear in interviews

Behavioral Questions:
- Generate 5 to 7 questions
- Use realistic hiring manager questions
- Include strong example answers

========================
SKILL GAP RULES
========================

- Do not invent missing skills
- Only identify gaps supported by resume or job description
- Be direct and realistic

========================
PREPARATION PLAN
========================

Generate a strict 7-day interview preparation roadmap.

Each day should contain:
- focus
- 3 to 5 actionable tasks

========================
IMPORTANT RULES
========================

- Return ONLY valid JSON
- Do NOT include markdown
- Do NOT include explanations outside JSON
- Keep answers practical and specific
- Avoid generic advice
- Make the report realistic and brutally honest
`;
}

module.exports = {
  buildInterviewReportPrompt,
};