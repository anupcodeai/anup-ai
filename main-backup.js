const express = require("express");
require("dotenv").config();
const OpenAI = require("openai");

const app = express();
app.use(express.static("public"));
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
  res.send("TEST ANUP AI 123");
});

app.post("/ask", async (req, res) => {
 console.log(req.body);
 console.log("API call started");
 console.log("Before API");
 const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: req.body.question,
  });
  console.log("After API");
  console.log(response);
  console.log("DONE");
console.log(response.output_text);
  res.json({
    answer: response.output_text,
  
});
});
app.listen(3000, () => {
  console.log("Anup AI is running on port 3000");
});