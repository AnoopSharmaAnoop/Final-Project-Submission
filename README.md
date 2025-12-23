# Full Stack AI Content Automation System

This is a monolithic repository containing a complete AI-powered content automation system. It integrates a **Laravel Backend**, a **React Frontend**, and a **Self-Healing Node.js AI Engine** that scrapes, researches, and rewrites content automatically using Google Gemini 2.5.

## 📂 Project Structure

- **`/beyondchats-backend`**: Laravel API serving content and managing the database.
- **`/frontend`**: React.js dashboard with glassmorphism UI and AI toggle switches.
- **`/phase2-script`**: Node.js automation engine (Web Scraper + Gemini AI).

---

## 🏗️ Architecture & Data Flow

```mermaid
graph TD
    subgraph "AI Automation Engine (Node.js)"
        A[Start Script] -->|1. Fetch Articles| B(Laravel API)
        B -->|Return Articles| A
        A -->|2. Search & Scrape| C{Web Sources}
        C -->|Competitor Content| A
        A -->|3. Send to AI| D[Gemini 2.5 API]
        D -->|Enhanced HTML| A
        A -->|4. Update Database| B
    end

    subgraph "Backend System (Laravel)"
        B <-->|Read/Write| E[(MySQL Database)]
    end

    subgraph "User Interface (React)"
        F[Client Browser] -->|5. Fetch Data| B
        F -->|6. Toggle AI View| F
    end

    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#bbf,stroke:#333,stroke-width:2px
    style D fill:#ff9,stroke:#333,stroke-width:2px


🚀 Local Setup Instructions
Follow these steps to run the entire system locally.

1. Backend Setup (Laravel)
Navigate to the backend folder and start the API server.


    cd beyondchats-backend
composer install
cp .env.example .env
# Configure your DB_DATABASE in .env
php artisan key:generate
php artisan migrate
php artisan serve

Server runs at: http://127.0.0.1:8000

2. Frontend Setup (React)
Open a new terminal, navigate to the frontend, and start the UI.

cd frontend
npm install
npm run dev

App runs at: http://localhost:5173

3. AI Engine Setup (Node.js)
Open a third terminal to run the automation script.

cd phase2-script
npm install
# Create a .env file and add: GEMINI_API_KEY=your_key_here
node index.js


🌐 Live Link
(Note: Since this project relies on a local Laravel API and MySQL database, a full live demo requires cloud hosting.)

Repository Link: https://github.com/AnoopSharmaAnoop/Final-Project-Submission

🛠️ Tech Stack
Frontend: React, Vite, Tailwind CSS, Lucide Icons

Backend: Laravel 11, MySQL

AI/Automation: Node.js, Puppeteer (JSDOM), Google Gemini API, Axios


---

### **Step 3: Save and Finish**
1.  Paste the text into your Notepad.
2.  Press **`Ctrl + S`** to save.
3.  Close Notepad.
4.  Run this in your terminal to finish:

```cmd
git add README.md
git commit -m "Final Polish"
git push


