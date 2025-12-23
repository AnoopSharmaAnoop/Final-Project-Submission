# Full Stack Content Automation System

This project is a full stack application built using Laravel, React, and Node.js.
It fetches articles from a backend API, processes them using an automation script, and displays them on a responsive frontend.

---

## Project Structure

- beyondchats-backend  
  Laravel backend API and database logic

- frontend  
  React frontend for displaying articles

- phase2-script  
  Node.js automation script for updating articles

---

## Backend Setup (Laravel)

cd beyondchats-backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve

Backend API runs at:
http://127.0.0.1:8000

---

## Frontend Setup (React)

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
