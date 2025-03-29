EmployWise Assignment
Project Overview
The EmployWise Assignment is a web application built using React + Vite with Tailwind CSS v3, Material-UI, and Bootstrap. It demonstrates CRUD operations using the Reqres API for user management, including authentication, user listing, and editing.

Features
User Authentication (Login)

Display a list of users fetched from the Reqres API

Edit user details with form validation

Responsive UI with Tailwind CSS v3, Material-UI, and Bootstrap

Technologies Used
React + Vite

Tailwind CSS v3

Material-UI

Bootstrap

Reqres API

JavaScript (ES6)

HTML & CSS

Folder Structure
bash
Copy
Edit
EmployWise-Assignment/
├── dist/                # Tailwind-generated output.css
├── src/
│   ├── components/
│   │   └── Navbar.jsx   # Navigation Bar Component
│   ├── pages/
│   │   ├── Login.jsx    # Login Page
│   │   ├── UsersList.jsx # List of Users
│   │   └── EditUser.jsx  # Edit User Details
│   ├── App.jsx          # Main Application
│   ├── index.css        # Tailwind CSS
│   └── main.jsx         # Entry Point
├── tailwind.config.js   # Tailwind Configuration
├── package.json         # Project Dependencies
└── README.md            # Project Documentation


Setup and Installation
Clone the repository:

bash
Copy
Edit
git clone <repository-url>
Navigate to the project directory:

bash
Copy
Edit
cd EmployWise-Assignment
Install dependencies:

bash
Copy
Edit
npm install
Start the development server:

bash
Copy
Edit
npm run dev
Access the app at http://localhost:5173

Usage Instructions
Login
Enter a valid email and password (mock validation).

Successful login redirects to the users list page.

Users List
Displays users fetched from the Reqres API.

Click "Edit" on a user to update their details.

Edit User
Modify user details and save changes.

Changes are reflected on the users list page.

Known Issues
Authentication is mock-based (not secure for production).

Tailwind CSS conflicts were resolved by using inline styles.

Limited error handling for API requests.

License
This project is for educational purposes.
