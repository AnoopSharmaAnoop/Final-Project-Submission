const axios = require('axios');
require('dotenv').config();

const key = process.env.GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;

console.log("🔍 Checking available models for your API Key...");

axios.get(url)
  .then(res => {
    console.log("\n✅ AVAILABLE MODELS (Copy one of these names):");
    res.data.models.forEach(m => {
      // Only show models that can generate text
      if (m.supportedGenerationMethods.includes('generateContent')) {
        console.log(` - ${m.name.replace('models/', '')}`); 
      }
    });
  })
  .catch(err => {
    console.error("\n❌ Error listing models:");
    console.error(err.response ? JSON.stringify(err.response.data, null, 2) : err.message);
  });