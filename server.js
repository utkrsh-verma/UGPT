// server.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 Paste your new Gemini API key here
const API_KEY = "AIzaSyARTNcL6zh43FdwIsrz16IuyHoQ8EboP0c";

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    // ✅ Updated working model
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: userMessage }]
            }
          ]
        })
      }
    );

    const data = await response.json();
    console.log("GEMINI RESPONSE:", JSON.stringify(data, null, 2));

    // ✅ Safely extract reply
    let reply = "No response from Gemini 😢";
    if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
      reply = data.candidates[0].content.parts[0].text;
    } else if (data.error) {
      reply = data.error.message;
    }

    res.json({ reply });

  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Server error ❌" });
  }
});

// ✅ Server listens on port 3000
app.listen(3000, () => {
  console.log("UGPT running on http://localhost:3000");
});
