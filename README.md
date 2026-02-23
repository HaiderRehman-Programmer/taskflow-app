TaskFlow – Zero-Install Full-Stack App Walkthrough
What Was Built
A complete Task Manager web application with a Node.js/Express backend and a premium dark glassmorphism frontend.

NOTE

This app uses NeDB, a file-based database. Unlike MongoDB, it requires zero installation on your system. Data is stored in the data/ folder automatically.

Project Structure
Practice Project 1/
├── server.js               ← Express entry point
├── package.json
├── .env                    ← Secrets (JWT_SECRET, PORT)
├── .gitignore
├── data/                   ← Auto-generated: stores your data
│   ├── users.db            ← User accounts
│   └── tasks.db            ← Task items
├── config/
│   └── db.js               ← NeDB setup
├── models/
│   ├── User.js             ← User data wrapper
│   └── Task.js             ← Task data wrapper
├── middleware/
│   └── auth.js             ← JWT verification middleware
├── routes/
│   ├── auth.js             ← Auth API
│   └── tasks.js            ← Tasks API
└── public/
    ├── index.html          ← Auth page (Login / Register)
    ├── dashboard.html      ← Task dashboard
    ├── css/style.css       ← Premium glassmorphism design
    └── js/
        ├── auth.js         ← Login/register logic
        └── app.js          ← Task management logic
API Reference
Method	Endpoint	Auth	Description
POST	/api/auth/register	❌	Create account
POST	/api/auth/login	❌	Login → get JWT
GET	/api/auth/me	✅	Get current user
GET	/api/tasks	✅	List all tasks
POST	/api/tasks	✅	Create task
PUT	/api/tasks/:id	✅	Update/toggle task
DELETE	/api/tasks/:id	✅	Delete task
Premium UI Features
✨ Enhanced Glassmorphism: High-quality backdrop blur and subtle border glows for a modern depth effect.
🌊 Staggered Animations: Tasks slide into view sequentially, creating a fluid and state-of-the-art interactive experience.
🎨 Dynamic Gradients: Vibrant HSL-tailored colors for primary actions and stats.
📱 Fully Responsive: Optimized for all devices, from desktop screens to mobile phones.
Verification Results
✅ npm install — All packages installed locally.
✅ npm run dev — Server running on http://localhost:5000.
✅ Database — NeDB initialized successfully (no external DB needed).
How to Test
Open http://localhost:5000 in your browser.
Register: Click "Create Account" and sign up.
Manage Tasks: Add tasks, set priorities, and complete them.
Persistence: Even if you restart the server, your tasks remain in the data/ files.
Terminal Commands
bash
# Start development server
npm run dev
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Full-Stack Node.js Web Application (NeDB Version)
Planning
 Explore existing project directory
 Design application architecture (NeDB file-based)
 Write implementation plan
Backend Setup
 Initialize 
package.json
 with NeDB & JWT
 Create Express server (
server.js
)
 Set up NeDB connection (
db.js
)
 Create User model (
models/User.js
)
 Create Task/Item model (
models/Task.js
)
 Set up authentication routes (
routes/auth.js
)
 Set up task/data routes (
routes/tasks.js
)
 Authentication middleware (
middleware/auth.js
)
 Environment config (
.env
)
Frontend Setup
 Create public/ directory structure
 
public/index.html
 - Landing/Login page
 
public/dashboard.html
 - Main app page
 
public/css/style.css
 - Global styles
 
public/js/app.js
 - Main frontend JS
 
public/js/auth.js
 - Auth-related JS
Verification
 Install dependencies (npm install)
 Start server (npm run dev)
 Test API and Frontend
 Set up Git and Push to GitHub
 Final UI polish
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
TaskFlow Implementation Plan
🏗️ Architecture Overview
TaskFlow is a full-stack Node.js application designed with a focus on ease of deployment and a premium user experience.

Backend: Node.js & Express.js
Database: NeDB (a file-based, zero-installation database)
Authentication: JWT (JSON Web Tokens) with Bcrypt password hashing
Frontend: Vanilla HTML/JS/CSS with a modern glassmorphism aesthetic
💾 Zero-Install Database (NeDB)
The core requirement was a database that works without local installation.

Storage: Data is stored in plain text .db files within the data/ directory.
Implementation: We used @seald-io/nedb to provide a Promise-based API for NeDB.
Data Persistence: Two datastores were created:
users.db: Stores hashed user credentials.
tasks.db: Stores user-specific task items.
🔐 Security & Auth Flow
Password Hashing: User passwords are saved using bcryptjs with a salt factor of 10.
Token-Based Auth: On login, a JWT is signed using a secret from the 
.env
 file.
Protected Routes: Middleware verifies the Authorization header on every request to task-related endpoints.
Data Ownership: The database queries are scoped strictly to the user_id extracted from the token.
✨ Premium UI Enhancements
The final "Polish" phase included:

Glassmorphism: backdrop-filter: blur(24px) combined with subtle translucent borders.
Staggered Animations: A small JavaScript delay (index * 0.05s) applied to each task item so they slide into view sequentially.
Floating Orbs: Three animated background orbs that create a dynamic, "alive" background.
Responsive Layout: A CSS Grid-based system that collapses elements gracefully on mobile devices.
🛠️ Deployment & Git
.gitignore: Configured to exclude node_modules, 
.env
, and local caches to keep the repository clean.
GitHub: The project is linked to origin/main at HaiderRehman-Programmer/taskflow-app.
