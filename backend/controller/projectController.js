import express from 'express';
import cookieParser from'cookie-parser'; // Import the cookie-parser middleware
const app = express();
app.use(cookieParser()); // Use the cookie-parser middleware

const projectController = {}

projectController.getProjects = async (req, res, next) => {
    const username = req.cookies.user
    console.log(username)
}