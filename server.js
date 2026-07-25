const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.post("/ask", (req, res) => {

const question = req.body.question.toLowerCase();

let answer = "माफ़ कीजिए, अभी मैं इस सवाल का जवाब नहीं दे सकता।";

if(question.includes("hello") || question.includes("hi") || question.includes("नमस्ते")){
answer = "नमस्ते! मैं Anup AI हूँ। 😊";
}

else if(question.includes("तुम कौन हो")){
answer = "मैं Anup AI हूँ, आपकी मदद के लिए तैयार हूँ।";
}

else if(question.includes("your name")){
answer = "My name is Anup AI.";
}

else if(question.includes("thank")){
answer = "You're welcome ❤️";
}

res.json({
answer: answer
});

});
app.listen(3000, () => {
  console.log("Anup AI is running on port 3000");
});