const express = require("express");
require("dotenv").config();
const OpenAI = require("openai");

const app = express();

app.use(express.json());
app.use(express.static("public"));

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/ask", async (req, res) => {
  try {
    console.log("Question:", req.body.question);

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: req.body.question,
    });

    console.log("AI Response:", response.output_text);

    res.json({
      answer: response.output_text,
    });

  } catch (error) {
    console.log("ERROR:", error.message);

    res.status(500).json({
      answer: "API error: " + error.message,
    });
  }
});

app.listen(3000, () => {
  console.log("Anup AI is running on port 3000");
});