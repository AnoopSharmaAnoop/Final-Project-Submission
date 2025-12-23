require('dotenv').config();
const axios = require('axios');
const { JSDOM } = require("jsdom");

// --- CONFIGURATION ---
const LARAVEL_API_URL = "http://127.0.0.1:8000/api/articles";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// *** CRITICAL UPDATE: Using a model name confirmed from your list ***
const MODEL_NAME = "gemini-2.5-flash"; 

// --- 1. SEARCH & SCRAPE (With Fail-Safe) ---
async function searchAndScrape(query) {
    console.log(`   ...Searching for: "${query}"...`);
    try {
        // Try DuckDuckGo
        const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
        const { data } = await axios.get(url, { 
            headers: { 'User-Agent': 'Mozilla/5.0' }, 
            timeout: 5000 
        });
        
        const dom = new JSDOM(data);
        const links = [];
        dom.window.document.querySelectorAll('.result__a').forEach(a => {
            if (a.href && a.href.startsWith('http') && !a.href.includes('duckduckgo')) {
                links.push(a.href);
            }
        });

        if (links.length > 0) {
            return await scrapeLinks(links.slice(0, 2));
        }
    } catch (e) {
        console.log("   ⚠️ Search blocked. Switching to Backup Mode.");
    }

    // FALLBACK: If search fails, return generic info so the AI still works
    return `
    --- SOURCE: Industry Best Practices ---
    Chatbots allow businesses to provide 24/7 support, reducing wait times and operational costs.
    Key features include automated responses, CRM integration, and instant lead qualification.
    Live chat offers a human touch but requires staff availability.
    `;
}

// --- 2. SCRAPE HELPER ---
async function scrapeLinks(links) {
    let content = "";
    for (const link of links) {
        try {
            console.log(`   ...Scraping ${link}...`);
            const { data } = await axios.get(link, { timeout: 5000 });
            const dom = new JSDOM(data);
            const text = dom.window.document.body.textContent || "";
            content += `\n\n--- SOURCE: ${link} ---\n${text.replace(/\s+/g, ' ').substring(0, 1500)}`;
        } catch (e) { 
            console.log(`   ⚠️ Could not scrape ${link}`); 
        }
    }
    return content;
}

// --- 3. AI GENERATION (DIRECT API MODE) ---
async function generateEnhancedArticle(originalTitle, originalContent, competitorContent) {
    try {
        const prompt = `
        You are an SEO Content Editor.
        Task: Rewrite the Original Article to be comprehensive and professional using HTML.
        
        Requirements:
        1. Use proper HTML tags: <h1>, <h2>, <p>, <ul>, <li>.
        2. Keep the core message but enhance it with facts from the Competitor Content.
        3. Add a "References" section at the bottom citing the source links.
        4. Return ONLY the HTML code (no markdown).

        Original Title: ${originalTitle}
        Original Content: ${originalContent.substring(0, 1000)}...

        Competitor Content:
        ${competitorContent}
        `;

        // Direct HTTP Request using the VALID model name
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`;
        
        const response = await axios.post(apiUrl, {
            contents: [{
                parts: [{ text: prompt }]
            }]
        }, {
            headers: { 'Content-Type': 'application/json' }
        });

        const text = response.data.candidates[0].content.parts[0].text;
        return text.replace(/```html/g, '').replace(/```/g, '');

    } catch (error) {
        console.error("   ⚠️ AI Generation Failed: " + (error.response?.data?.error?.message || error.message));
        return null;
    }
}

// --- 4. MAIN BATCH LOOP ---
async function main() {
    console.log(`🚀 Starting Batch Processing using ${MODEL_NAME}...`);
    
    try {
        const { data: articles } = await axios.get(LARAVEL_API_URL);
        console.log(`📊 Found ${articles.length} articles.`);

        for (const article of articles) {
            console.log(`\n--------------------------------------------------`);
            console.log(`📄 Processing ID ${article.id}: "${article.title}"`);

            if (article.enhanced_content) {
                console.log("   ✅ Already enhanced. Skipping.");
                continue;
            }

            // 1. Get Content
            const competitorContent = await searchAndScrape(article.title);

            // 2. Generate AI Version
            const newContent = await generateEnhancedArticle(article.title, article.content, competitorContent);

            // 3. Save to Database
            if (newContent) {
                await axios.put(`${LARAVEL_API_URL}/${article.id}`, { enhanced_content: newContent });
                console.log(`   💾 Successfully updated Article ID ${article.id}`);
            }
            
            // Wait 1 second to be polite
            await new Promise(r => setTimeout(r, 1000));
        }
        
    } catch (error) {
        console.error("❌ Fatal Error: " + error.message);
    }

    console.log("\n✅ Processing Complete!");
}

main();