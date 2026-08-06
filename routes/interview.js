const express = require("express");

const router = express.Router();
const OpenAI = require("openai");
const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
});
console.log("OPENROUTER_API_KEY =", process.env.OPENROUTER_API_KEY);
router.post("/", async (req, res) => {

    const { job, level, language, answer } = req.body;
    const { interviewAnswers = [] } = req.body;
const { questionNo = 1 } = req.body;
    try {

        const prompt = `
You are Anup AI Interview Evaluator.

Job Role: ${job}
Experience Level: ${level}
Language: ${language}

Current Question Number: ${questionNo} out of 5.

Candidate Answers:
${interviewAnswers.join("\n\n")}

Rules:

If current question number is less than 5:
- Ask the next interview question.
- Do not repeat previous questions.

If current question number is 5:
- Do not ask any more questions.
- Create final interview report.
- Questions should match the job role and experience.
- Do not repeat previous questions.

If 5 questions are completed:
Create a final interview report.

Final Report must include:

🏆 Interview Completed

Total Score: Give score out of 50 and percentage.

Communication Score:
Technical Knowledge Score:
Confidence Score:
Problem Solving Score:

Strengths:
- Mention candidate strengths.

Weaknesses:
- Mention areas to improve.

Selection Chance:
Give percentage.

Final Feedback:
Give professional advice in 4-5 lines.

Reply only in ${language}.
`;

        const result = await client.chat.completions.create({
            model: "openai/gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ]
        });

        res.json({
            question: result.choices[0].message.content
        });

    } catch (error) {

        console.log(error);

        res.json({
            question: "AI is unavailable right now."
        });

    }

});
module.exports = router;