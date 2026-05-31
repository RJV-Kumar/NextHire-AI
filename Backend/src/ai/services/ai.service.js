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
  selfDescription,
  userPrompt,
}) {
  try {
    const prompt = buildInterviewReportPrompt({
      resume,
      jobDescription,
      selfDescription,
      userPrompt,
    });

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: zodToJsonSchema(interviewReportOutputSchema),
      },
    });

    const parsedData = JSON.parse(response.text);

    // IMPORTANT: Validate Gemini output AGAIN using zod. Never trust raw LLM output.
    const validatedData = interviewReportOutputSchema.parse(parsedData);

    return validatedData;
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