function buildInterviewReportPrompt({
  resume,
  jobDescription,
  selfDescription
}) {
  return `
You are an expert technical interviewer, hiring manager, and career coach.

Your task is to analyze a candidate profile against a job description and generate a highly realistic interview preparation report.

    ========================
    STRICT OUTPUT RULES (CRITICAL)
    ========================
    - Every array MUST contain OBJECTS ONLY.
    - If you return a string inside any array, the response is INVALID.
    - NEVER simplify objects into strings.
    - NEVER return plain question lists.

    ========================
    HARD JSON SCHEMA
    ========================

    {
      "matchScore": number,
      "jobTitle": string,
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
          "skill": string,
          "severity": "low" | "medium" | "high"
        }
      ],
      "preparationPlan": [
        {
          "day": number,
          "focus": string,
          "tasks": [
            string
          ]
        }
      ]
    }

    ========================
    CRITICAL CONSTRAINTS
    ========================

    - technicalQuestions: MUST be 5–7 OBJECTS
    - behavioralQuestions: MUST be 5–7 OBJECTS
    - skillGaps: MUST be 3–5 OBJECTS
    - preparationPlan: MUST be EXACTLY 7 OBJECTS
    - DO NOT repeat "Day X" inside focus or tasks.
    - Day numbering is handled by the system.

    NEVER reduce arrays below minimum size.
    If unsure, generate more questions instead of fewer.

    ========================
    ANTI-FAIL RULES
    ========================

    - NEVER return:
      "technicalQuestions": ["string", "string"]
    - NEVER return:
      null or undefined fields
    - NEVER skip jobTitle
    - NEVER omit preparationPlan

    ========================
    INPUT DATA
    ========================

    RESUME:
    ${resume || "Not Provided"}

    SELF DESCRIPTION:
    ${selfDescription || "Not Provided"}

    JOB DESCRIPTION:
    ${jobDescription}

    ========================
    FINAL INSTRUCTION
    ========================

    Return ONLY valid JSON that strictly matches the schema above.
    ========================
    EXAMPLE OUTPUT (FOLLOW EXACTLY):
    ========================
    {
      "matchScore": 85,
      "jobTitle": "Backend Developer",
      "technicalQuestions": [
        {
          "question": "What is Node.js event loop?",
          "intention": "Test async understanding",
          "answer": "Explain phases of event loop..."
        },
        {
          "question": "What are middleware functions in Express?",
          "intention": "Check backend architecture knowledge",
          "answer": "Middleware are functions..."
        }
      ],
      "behavioralQuestions": [
        {
          "question": "Tell me about a challenging bug you fixed",
          "intention": "Problem-solving ability",
          "answer": "Use STAR method..."
        }
      ],
      "skillGaps": [
        {
          "skill": "Docker",
          "severity": "medium"
        }
      ],
      "preparationPlan": [
        {
          "day": 1,
          "focus": "Node.js Event Loop"
          "tasks": [
            "Study event loop phases",
            "Write async/await examples",
            "Solve callback vs promise problems"
          ]
        }
      ]
    }
    `;
}

function resumeGenerationPrompt({
  resume,
  selfDescription,
  jobDescription,
}) {
  return `
You are a resume writer and ATS optimization assistant.

Your task is to extract and rewrite the candidate information into ONE strict JSON object.

STRICT OUTPUT RULES:
- Return ONLY valid JSON.
- Do NOT wrap the response in markdown.
- Do NOT include explanations or commentary.
- Do NOT return HTML.
- Do NOT return arrays of strings where an object is required.
- Do NOT invent facts that are not supported by the input.

INPUTS:

RESUME:
${resume || "Not provided"}

SELF DESCRIPTION:
${selfDescription || "Not provided"}

JOB DESCRIPTION:
${jobDescription || "Not provided"}

OUTPUT SCHEMA:
{
  "name": string,
  "summary": string,
  "skills": [string],
  "experience": [
    {
      "company": string,
      "role": string,
      "duration": string,
      "highlights": [string]
    }
  ],
  "projects": [
    {
      "name": string,
      "description": string,
      "highlights": [string]
    }
  ]
}

GUIDELINES:
- Use only the information provided in the inputs.
- Rewrite content into concise ATS-friendly language.
- Keep the structure deterministic and complete.
- If a field has no data, return an empty array for skills, experience, or projects.
- Keep every value JSON-safe.

OUTPUT:
Return ONLY valid JSON that matches the schema exactly.
`;
}

module.exports = {
  buildInterviewReportPrompt,
  resumeGenerationPrompt
};