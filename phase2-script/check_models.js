require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    console.log("Checking available models...");
    
    // This is a special hidden function to list what you can access
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
    );
    const data = await response.json();

    if (data.models) {
      console.log("\n✅ AVAILABLE MODELS:");
      data.models.forEach(m => {
        if (m.supportedGenerationMethods.includes("generateContent")) {
          console.log(`- ${m.name.replace('models/', '')}`);
        }
      });
    } else {
      console.log("❌ No models found. Response:", data);
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

listModels();