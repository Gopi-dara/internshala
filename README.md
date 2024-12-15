Task List Manager - Internshala Project

Overview

The Task List Manager is a React-based application designed to manage tasks with advanced features such as filtering, editing, and status management. The app integrates the Tabulator.js library for creating dynamic and interactive tables and utilizes Tailwind CSS for styling.

Technologies Used

Frontend:

React.js: A JavaScript library for building the user interface.

Tabulator.js: A table generation library to render interactive tables.

CSS: For custom styles and layout.

Tailwind CSS: A utility-first CSS framework for styling components.

Backend:

API: The app fetches initial task data from JSONPlaceholder for demonstration purposes.

Features

Task Management:

Add new tasks with title, description, and status.

Delete existing tasks.

Edit task titles and descriptions directly in the table.

Task Status:

Assign and update statuses: To Do, In Progress, and Done.

Filtering:

Filter tasks by their statuses or display all tasks.

Dynamic Table:

Interactive table powered by Tabulator.js with customizable columns and actions.

How to Run the Project

Prerequisites

Node.js (v16 or higher)

npm (v8 or higher)

Steps

Clone the repository:

git clone https://github.com/Gopi-dara/internshala.git

Navigate to the project directory:

cd internshala

Install dependencies:

npm install

Start the development server:

npm start

Open the application in your browser at:

http://localhost:3000

Output Screenshot

Main Dashboard

Displays a dynamic table with tasks loaded from the API.

Provides filtering, adding, editing, and deleting functionalities.



Project Structure

Internshala/
├── public/
├── src/
│   ├── App.css
│   ├── App.jsx
│   ├── Task.jsx
│   ├── data.json
│   ├── index.css
│   ├── index.js
├── README.md
├── package.json
├── package-lock.json
└── .gitignore

Future Improvements

Integrate a proper backend with a database to persist tasks.

Add authentication for users.

Enhance the UI with more animations and responsiveness.

Credits

Developer: Gopi Dara

API: JSONPlaceholder (Demo API)

Libraries: React.js, Tabulator.js, Tailwind CSS
