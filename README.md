# Space Management System

This project is a versatile, full-stack web application that can be adapted for various use cases, such as renting out spaces. 
It is designed to help owners keep track of users, their payment history, due dates, and more. 
The system ensures security with JWT-based authentication and provides insightful data visualization.
## Features:
  ## Core Functionalities:
- **CRUD Operations**: Create, Read, Update, and Delete records of individuals (e.g., students or tenants).
- **Payment Tracking**: Maintain a detailed history of payments, including amounts and dates.
- **Search Students**: Automatically calculate due dates based on the last payment date and highlight records approaching or past the due date.
- **Individual Deletion**: Remove records when users leave the system.
- **Search Functionality**: Retrieve records by their unique number.
  ## Owner-Specific Features:
- **User Insights**: Provide a graphical representation of users' status, displaying the percentage of users with safe and due statuses.
- **Highlight Due Dates**: Highlight users with approaching due dates in red to prompt timely action.
- **Credential Management**: Allow owners to update their account credentials, such as email and password.
- **Owner credential management**: Owners can manage and update their email, password and names.
  ## Security:
- **JWT Authentication**: Secure login and session management using JSON Web Tokens.
- **Owner Authentication**: Each owner has a unique login via email and password, with a sign-up option for new owners.
  

## Tech Stack:

### Frontend:
- **React.js**: Frontend library for building the user interface.
- **React Router**: For managing navigation between different components (SignIn, AppContent, and ChangeKey).
- **LocalStorage**: Used to store and access the secret key on the client side.
- **CSS Modules**: For styling individual components, ensuring maintainability and modular design.

### Backend:
- **Express.js**: Web framework for building the API to handle CRUD operations and authentication.
- **RESTful API**: Endpoints to manage student data and JWT authentication.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB to interact with the database.
- **CORS**: Middleware to allow secure cross-origin requests between the frontend and backend.

### Database:
- **MongoDB**: NoSQL database to store student records and secret key information.
- **Mongoose Schema**: Defined for both students and secret keys.

## Installation:

### 1. Clone the repository:
git clone https://github.com/sunish2809/ManageMyLibrary.git

### 2. Backend Setup:
  2.1. Navigate to the backend folder and install the necessary dependencies:
      cd backend
      npm install

  2.2. Create a `.env` file in the backend folder with the following variables:
      MONGO_URI=Your MongoDB URL
      FRONTEND_URL=Your Frontend URL

  2.3. Start the backend server:
      npm start

### 3. Frontend Setup:
  3.1. Navigate to the frontend folder and install the necessary dependencies:
      cd frontend
      npm install

  3.2. Start the frontend development server:
      npm run dev
