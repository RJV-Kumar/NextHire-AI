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
ADDITIONAL USER CONTEXT
========================

${userPrompt || "None"}

========================
INSTRUCTIONS
========================

Generate:

1. matchScore
- A number between 0 and 100
- Reflect actual alignment between candidate and job

2. technicalQuestions
- Generate 5 to 7 realistic technical interview questions
- Questions should match the actual role seniority and stack
- Include:
  - question
  - intention
  - answer

3. behavioralQuestions
- Generate 5 to 7 realistic behavioral interview questions
- Include:
  - question
  - intention
  - answer

4. skillGaps
- Identify 3 to 5 meaningful weaknesses or missing skills
- Do NOT invent fake weaknesses
- Use realistic industry expectations

5. preparationPlan
- Generate a strict 7-day preparation roadmap
- Each day must contain:
  - day
  - focus
  - tasks

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