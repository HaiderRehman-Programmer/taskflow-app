 TaskFlow - Zero-Install Task Manager
 
<img width="1920" height="1539" alt="screencapture-localhost-5000-index-html-2026-02-23-12_29_43" src="https://github.com/user-attachments/assets/1fc54357-ab96-4586-8a01-2efa5edc5200" />

<img width="1920" height="1774" alt="screencapture-localhost-5000-dashboard-html-2026-02-23-12_32_01" src="https://github.com/user-attachments/assets/e1261b79-bca4-4cb3-8e97-a9eba84f0f7d" />



A complete full-stack task management application featuring a premium dark glassmorphism interface and a zero-installation database. Built with Node.js, Express, and NeDB.

 ✨ Features

 🔋 Backend
- **Zero Database Setup** - Uses NeDB, a file-based database that requires no installation
- **JWT Authentication** - Secure user authentication with token-based sessions
- **RESTful API** - Well-structured endpoints for all CRUD operations
- **Data Persistence** - Automatically stores data in local files

 🎨 Frontend
- **Premium Glassmorphism Design** - Modern UI with backdrop blur effects and subtle border glows
- **Staggered Animations** - Fluid task entry with sequential slide-in effects
- **Dynamic Gradients** - Vibrant, HSL-tuned colors for interactive elements
- **Fully Responsive** - Optimized for all devices from desktop to mobile
- **Floating Orbs** - Animated background elements for visual depth

 🚀 Quick Start

 Prerequisites
- Node.js (v14 or higher)
- npm or yarn

 Installation

1. Clone the repository
```bash
git clone https://github.com/HaiderRehman-Programmer/taskflow-app.git
cd taskflow-app

Install dependencies

npm install
Create a .env file in the root directory

env
PORT=5000
JWT_SECRET=your_super_secret_key_change_this
Start the development server

npm run dev
Open your browser and navigate to http://localhost:5000

📁 Project Structure
text
taskflow-app/
├── server.js                    # Express entry point
├── package.json
├── .env                        # Environment variables
├── .gitignore
├── data/                       # Auto-generated database files
│   ├── users.db                # User accounts
│   └── tasks.db                # Task items
├── config/
│   └── db.js                   # NeDB setup
├── models/
│   ├── User.js                 # User model
│   └── Task.js                 # Task model
├── middleware/
│   └── auth.js                 # JWT verification
├── routes/
│   ├── auth.js                  # Authentication endpoints
│   └── tasks.js                 # Task management endpoints
└── public/                      # Static frontend files
    ├── index.html               # Login/Register page
    ├── dashboard.html           # Main task dashboard
    ├── css/
    │   └── style.css            # Glassmorphism styles
    └── js/
        ├── auth.js              # Auth logic
        └── app.js               # Task management logic
📡 API Reference
Method	Endpoint	Auth	Description
POST	/api/auth/register	❌	Create a new account
POST	/api/auth/login	❌	Login and receive JWT
GET	/api/auth/me	✅	Get current user info
GET	/api/tasks	✅	List all user tasks
POST	/api/tasks	✅	Create a new task
PUT	/api/tasks/:id	✅	Update task status
DELETE	/api/tasks/:id	✅	Delete a task
💡 How It Works
Zero-Install Database
TaskFlow uses NeDB, a file-based database that stores data in plain text files within the data/ directory. This eliminates the need for:

Separate database installation

Database configuration

Connection management

External dependencies

Authentication Flow
User registers with email/password

Password is hashed using bcrypt and stored in users.db

On login, a JWT token is generated and returned

Token must be included in subsequent API requests

Middleware validates token and extracts user context

Data Persistence
All data persists automatically in:

data/users.db - User accounts

data/tasks.db - Task items

No database server required - your data lives in the project folder!

🎯 Usage
Register - Create a new account from the login page

Login - Access your personal task dashboard

Add Tasks - Create tasks with titles and priorities

Manage - Mark tasks complete or delete them

Persist - All changes save automatically

🛠️ Development Commands
bash
# Start development server with nodemon
npm run dev

# Start production server
npm start

# View database files
ls -la data/
🔒 Security Features
Password Hashing - bcryptjs with salt factor 10

JWT Authentication - Token-based secure sessions

Data Isolation - Users can only access their own tasks

Environment Variables - Secrets stored in .env

🎨 UI/UX Highlights
Glassmorphism - backdrop-filter: blur(24px) with translucent borders

Staggered Animations - Tasks slide in with per-item delays

Dynamic Background - Animated orbs create depth

Priority Indicators - Visual cues for task importance

Responsive Design - Seamless experience across devices

📝 License
This project is licensed under the MIT License.

🤝 Contributing
Contributions, issues, and feature requests are welcome!

👨‍💻 Author
Haider Rehman

GitHub: @HaiderRehman-Programmer
