const { z } = require("zod");

const interviewReportOutputSchema = z.object({
  matchScore: z.number().min(0).max(100)
    .describe("Overall compatibility score between candidate and job role from 0 to 100"),

  technicalQuestions: z.array(z.object({
        question: z.string().describe("Technical interview question"),
        intention: z.string().describe("What the interviewer wants to evaluate through this question"),
        answer: z.string().describe("Detailed guidance on how the candidate should answer"),
      })
    ).min(5).max(7)
    .describe("Likely technical interview questions with answer guidance"),

  behavioralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("Behavioral interview question"),

        intention: z
          .string()
          .describe(
            "What personality trait or behavior is being evaluated"
          ),

        answer: z
          .string()
          .describe(
            "Recommended strategy and talking points for answering"
          ),
      })
    )
    .min(5)
    .max(7)
    .describe(
      "Likely behavioral interview questions with answer guidance"
    ),

  skillGaps: z
    .array(
      z.object({
        skill: z
          .string()
          .describe(
            "Missing or weak skill relevant to the target role"
          ),

        severity: z
          .enum(["low", "medium", "high"])
          .describe(
            "Importance level of the missing skill"
          ),
      })
    )
    .min(3)
    .max(5)
    .describe(
      "Skills or knowledge areas the candidate should improve"
    ),

  preparationPlan: z
    .array(
      z.object({
        day: z
          .number()
          .describe("Preparation day number"),

        focus: z
          .string()
          .describe(
            "Primary preparation focus for the day"
          ),

        tasks: z
          .array(z.string())
          .min(3)
          .max(6)
          .describe(
            "Specific actionable tasks for interview preparation"
          ),
      })
    )
    .min(7)
    .max(7)
    .describe(
      "7-day structured interview preparation roadmap"
    ),
});

module.exports = {
  interviewReportOutputSchema,
};