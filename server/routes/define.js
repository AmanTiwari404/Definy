const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
dotenv.config();

console.log(process.env.KEY)

const genAI = new GoogleGenerativeAI("AIzaSyB5JUsI_tZdBJ4XNmt0y1cshv1KPkgtAvo");

router.post('/', async (req, res) => {
  const { query } = req.body;

  console.log("API Key Loaded?", process.env.KEY ? "✅ YES" : "❌ NO");

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(`Give a short and concise definition of "${query}" in 1–2 lines.`);
    const response = await result.response;
    const text = response.text();

    res.json({ definition: text });
  } catch (error) {
    console.error("❌ Gemini API Error:", error.message);
    res.status(500).json({ error: 'Failed to fetch definition' });
  }
});

module.exports = router;
