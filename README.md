## Prerequisites

- Node.js (v14 or higher) but i am using Node v20.  
- MongoDB (MongoDB Atlas or local MongoDB instance) but in this project i am using MongoDB Atlas cloud database.

### Backend Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/rudranilbanerjee/course-management-system.git
   cd course-management-system/backend

2. **Install Dependencies:**
   npm install

3. **Set up Environment Variables:**
   Create a .env file in the backend directory and add the following environment variables:
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.ehrvtyz.mongodb.net/<dbname>?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=your_jwt_secret
   **NOTE:** Make sure to replace placeholder values like `<username>`, `<password>`, and `<dbname>` with the actual values for your project and in JWT_SECRET you can placed any random string. just like below example

   JWT_SECRET=2b7e151628aed2a6abf7158809cf4f3c762e7160a75b72d198d7f2ff9355ddc1

   you can genarate your own random string using Node Js REPL environment and run this below logic.

   require('crypto').randomBytes(64).toString('hex'); 

   if you want to use local mongodb instance then you can use this
   MONGO_URI=mongodb://localhost:27017/<dbname>

4. **Start the Backend Server:**
   npm run dev
   **NOTE:** The backend server will run on http://localhost:5000

### Frontend Setup

1. **Navigate to the Frontend Directory:**
   cd ../frontend

2. **Install Dependencies:**
   npm install

3. **Set up Environment Variables:**
   Create a .env file in the frontend directory and add the following environment variables:
   
   VITE_API_URL=http://localhost:5000

4. **Start the Frontend Server:**
   npm run dev

   **NOTE:** The frontend server will run on http://localhost:5173