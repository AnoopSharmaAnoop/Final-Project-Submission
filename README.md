# Full Stack Content Automation System

This project is a full stack application built using Laravel, React, and Node.js.
It fetches articles from a backend API, processes them using an automation script, and displays them on a responsive frontend.
 
 
 
 I have followed steps given below
---

## Project Structure with Steps


## Backend Setup (Laravel)

- beyondchats-backend  

1.   composer create-project laravel/laravel beyondchats-backend
     cd beyondchats-backend
2. We need a library to parse HTML (DOM Crawler). Install it:
     composer require symfony/dom-crawler
    
     “Raw HTML is difficult to work with directly. DomCrawler converts HTML into a structured DOM tree, which allows me to easily and reliably extract specific elements using CSS selectors. This makes it essential for web scraping.”

                When we scrape a website, the response we get is raw HTML, which is just a long block of text.

                Example:

                <div class="post">
                      <h2>Blog Title</h2>
                      <span class="date">Jan 2022</span>
                </div>


                For PHP or Laravel, this is just text.
                They do not automatically understand:
                what <h2> represents
                what is inside <div class="post">
                Without a parser:
                You would need to manually search for tags
                You must calculate where text starts and ends
                This approach is error-prone and unreliable

3.  php artisan make:model Article -m
            Edit the Migration File (database/migrations/xxxx_create_articles_table.php):
            add required attributes  'title',  'content', 'url','author_name',   'enhanced_content' 

4. php artisan make:command ScrapeArticles
      Edit the Command File (app/Console/Commands/ScrapeArticles.php)
      This script finds the last page of the blog to get the oldest articles.

5. php artisan make:controller Api/ArticleController --api
        This handles fetching and updating (for your Node.js script).
6. Register Routes (routes/api.php)

7. How to Run Phase 
         1. Run the Migration:
          php artisan migrate
         2. php artisan scrape:articles
         3.Start server   php artisan serve


Backend API runs at:
http://127.0.0.1:8000



## Frontend Setup (React)
      Note :-   The context states that to make your project live and accessible to others, you need to host both your frontend and backend on the internet. It suggests using services like DigitalOcean, AWS, or Heroku for the backend, which often involve costs. Therefore, it is accurate to state based on the text that hosting is required for a live project and may incur charges.

          
          Open your terminal (navigate out of the phase2-script folder first, back to your main workspace) and run:

Step 1: Create the React Project
            # Create a new React project using Vite (it's faster than create-react-app)
npm create vite@latest frontend -- --template react

          # Go into the folder
            cd frontend

          # Install dependencies
            npm install

          # Install Axios (to talk to Laravel) and a Parser (to     
                                render the HTML content safely)
          npm install axios html-react-parser

      I used a component-based architecture (likely referencing a UI library like Shadcn/UI or Tailwind CSS).
      for this 

  The Professional "Modern" Implementation

Step 1: Install Tailwind CSS

npm install -D tailwindcss@3.4 postcss autoprefixer

Reset  my Configuration Files

reset the two configuration files.

export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

   Create/Update postcss.config.js

npx tailwindcss init -p
Update tailwind.config.js with following code:

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

Add this to the top of your src/index.css:
@tailwind base;
@tailwind components;
@tailwind utilities;

Step 2: Create the Component Files
Create a folder src/components and create these 4 files inside it.

a. src/components/Header.jsx

b. src/components/ArticleCard.jsx 
   (Uses html-react-parser to render your AI HTML safely)

c. src/components/ArticleSkeleton.jsx (Loading state)

d. src/components/EmptyState.jsx

e. Update src/App.jsx

Add Professional Styling (src/App.css)

Step 4: Run the Frontend

npm run dev

Frontend runs at:
http://localhost:5173

---

## Automation Script Setup (Node.js)

Phase 2: Node.js Automation Script

"The initial specifications for Phase 2 instructed the use of the Google Custom Search JSON API to locate competitor articles. During the implementation phase, it was confirmed that accessing this Google API requires the activation of a Google Cloud Platform billing account with a valid credit card on file for identity verification, even to utilize the free tier quota.

Due to constraints preventing the provision of payment methods to cloud service providers, a necessary technical deviation was implemented.

Instead of the Google API, the project utilizes programmatic scraping of DuckDuckGo HTML search results as a functional alternative. This approach successfully demonstrates the core technical competency required by the assignment: programmatically searching the web with a dynamic query, extracting relevant external URLs, and passing those resources to the scraping engine. This workaround ensures the complete automated workflow of the AI content engine remains functional and achieves the project goals."





This script acts as the "bridge" between your local data, the open web, and an AI model.

Phase 2 Setup Guide (Axios/JSDOM/Gemini Variant)
1. Prerequisites & Tech Stack
You need the following installed and running before starting:

Node.js: (Version 16+ recommended).

Laravel Backend: Must be running locally (e.g., at http://127.0.0.1:8000) and have accessible endpoints to GET all articles and PUT updates.

Google Gemini API Key: A valid key from Google AI Studio.


axios: Used for all HTTP requests: fetching from Laravel, searching DuckDuckGo, scraping pages, and sending data to the Google Gemini REST API.

jsdom: Used to parse the raw HTML returned by DuckDuckGo and the blog pages you scrape to extract text.

dotenv: To manage your API keys securely.

2. Project Initialization & Installation
 run these commands to set up the project folder and install only the required dependencies for this specific version of the script.
mkdir phase2-script
cd phase2-script
npm init -y
npm install axios jsdom dotenv

3. Configuration (.env)
Create a new file named .env in your project folder. You need to define the URL for your local Laravel API and your Google Gemini API key.



# Your local Laravel API endpoint for articles
LARAVEL_API_URL=http://127.0.0.1:8000/api/articles

# Your Google Gemini API Key
GEMINI_API_KEY=your_actual_google_api_key_here
4. The Script Logic (index.js)
Create a file named index.js and write  the code 
Key Implementation Details of this Script:


Scraping Method: It uses jsdom to extract document.body.textContent, capturing all text on the page.

AI Method: It makes a direct HTTP POST request to the generativelanguage.googleapis.com REST endpoint, manually constructing the JSON payload.

5. Running the Script


 run your Node.js script:


node index.js

Note About phase-2 :- The script takes local data as input, processes it using external services (DuckDuckGo and Google Gemini in the cloud), and then saves the result back to your local storage.




## Application Flow

1. Articles are stored in the Laravel database
2. Node.js script fetches articles from the backend API
3. Reference content is searched and scraped
4. Articles are rewritten
5. Updated content is saved back to the backend
6. React frontend displays the articles

---

## Technologies Used

- React (Vite)
- Tailwind CSS
- Laravel 11
- MySQL
- Node.js
- Axios

---

## Repository

https://github.com/AnoopSharmaAnoop/Final-Project-Submission




