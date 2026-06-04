const { GoogleGenAI } = require("@google/genai");
const { zodToJsonSchema } = require("zod-to-json-schema");

const { interviewReportOutputSchema } = require("../schemas/report.output.schema");
const { buildInterviewReportPrompt } = require("../prompts/report.prompt");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GEMINI_API_KEY,
});

async function generateInterviewReport({
  resume,
  jobDescription,
  selfDescription
}) {
  try {
    const prompt = buildInterviewReportPrompt({
      resume,
      jobDescription,
      selfDescription
    });
    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: zodToJsonSchema(interviewReportOutputSchema),
      },
    });
    const rawText = response.text;

    let parsedData;
    try {
      parsedData = JSON.parse(rawText);
    } catch (parseError) {
      console.error("AI SERVICE RAW TEXT:", rawText);
      throw parseError;
    }

    //const validationResult = interviewReportOutputSchema.safeParse(parsedData);
    // const validationResult = validateAiResponse(parsedData);
    // if (!validationResult.success) {
    //   console.error("AI SERVICE ZOD ISSUES:", validationResult.error.issues);
    //   console.error("AI SERVICE ZOD FLATTENED:", validationResult.error.flatten());
    //   throw validationResult.error;
    // }

    // return validationResult.data;
    return parsedData;
  } catch (error) {
    console.error("AI SERVICE ERROR:", error);

    throw new Error(
      "Failed to generate interview preparation report"
    );
  }
}

module.exports = {
  generateInterviewReport,
};


function validateAiResponse(parsedData) {
  parsedData.matchScore = Number(parsedData.matchScore);
  if (Number.isNaN(parsedData.matchScore)) {
    parsedData.matchScore = 0;
  }

  parsedData.technicalQuestions = parsedData.technicalQuestions ?? [];
  parsedData.behavioralQuestions = parsedData.behavioralQuestions ?? [];
  parsedData.skillGaps = parsedData.skillGaps ?? [];
  parsedData.preparationPlan = parsedData.preparationPlan ?? [];
  parsedData.jobTitle = parsedData.jobTitle ?? "Unknown";
  return interviewReportOutputSchema.safeParse(parsedData);
}