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
const { questionNo = 1 } = req.body;
    try {

        const prompt = `
You are Anup AI Interviewer, a professional AI interviewer.

Job Role: ${job}
Experience Level: ${level}
Interview Language: ${language}

Current Question Number: ${questionNo} out of 5.

Candidate's Previous Answer:
${answer || "This is the first question."}

Rules:

1. If this is Question 1 and there is no previous answer, ask only the first interview question.

2. If there is a previous answer:
- Evaluate whether the answer is relevant to the previous question.
- If the answer is meaningless, random, copied, too short, unrelated, or incorrect:
  - Do NOT move to the next question.
  - Explain in one short sentence why the answer is weak.
  - Give one useful hint.
  - Ask a NEW version of the SAME question (do not repeat the exact wording).
  - Do NOT increase the question number.

3. If the answer is acceptable:
- Give:
  - ✅ Score (out of 10)
  - ✅ One-line Feedback
- Then ask the NEXT interview question.

4. Never repeat the exact same interview question.
Always create a fresh version of the same topic.

5. After Question 5 is completed, DO NOT ask another question.

Instead generate a Final Interview Report in this format:

🏆 Interview Completed

Overall Score: XX/100

Communication: X/10
Technical Knowledge: X/10
Confidence: X/10
Problem Solving: X/10
Professionalism: X/10

Strengths:
* ...
* ...

Weaknesses:
* ...
* ...

Selection Chance: XX%

Final Feedback:
Write 4-5 professional sentences explaining the candidate's performance and how they can improve.

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