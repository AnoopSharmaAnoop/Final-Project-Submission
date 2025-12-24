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

uses a component-based architecture (likely referencing a UI library like Shadcn/UI or Tailwind CSS).
Install Tailwind CSS
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p
This code is much more professional and uses a component-based architecture (likely referencing a UI library like Shadcn/UI or Tailwind CSS).

To make your App.jsx work with this design, we need to recreate the missing components (Header, ArticleCard, etc.) and ensure you have Tailwind CSS set up, as the classes (grid-cols-1, text-muted-foreground) rely on it.

Phase 3: The Professional "Modern" Implementation
Step 1: Install Tailwind CSS (If not already installed)
If you haven't set up Tailwind in your Vite project yet, run these commands in your frontend folder:

Bash

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
Update tailwind.config.js 


This code is much more professional and uses a component-based architecture (likely referencing a UI library like Shadcn/UI or Tailwind CSS).

To make your App.jsx work with this design, we need to recreate the missing components (Header, ArticleCard, etc.) and ensure you have Tailwind CSS set up, as the classes (grid-cols-1, text-muted-foreground) rely on it.

Phase 3: The Professional "Modern" Implementation
Step 1: Install Tailwind CSS (If not already installed)
If you haven't set up Tailwind in your Vite project yet, run these commands in your frontend folder:

Bash

npm install -D tailwindcss@3.4 postcss autoprefixer
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

1. src/components/Header.jsx
2. src/components/ArticleCard.jsx 
   (Uses html-react-parser to render your AI HTML safely)
3. src/components/ArticleSkeleton.jsx (Loading state)
4. src/components/EmptyState.jsx
5. Update src/App.jsx

Add Professional Styling (src/App.css)
Step 4: Run the Frontend

npm run dev

- frontend  
        

  React frontend for displaying articles

- phase2-script  
  Node.js automation script for updating articles

---



---



cd frontend
npm install
npm run dev

Frontend runs at:
http://localhost:5173

---

## Automation Script Setup (Node.js)

cd phase2-script
npm install

Create a .env file inside phase2-script:

GEMINI_API_KEY=your_api_key_here

Run the script:

node index.js

---

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




