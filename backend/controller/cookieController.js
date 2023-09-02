import express from 'express';
import cookieParser from'cookie-parser'; // Import the cookie-parser middleware
const app = express();
app.use(cookieParser()); // Use the cookie-parser middleware

const cookieController = {
    setCookie (req, res, next) {
        console.log('received user data:' , res.locals.user)
        res.cookie('_id', res.locals.user._id)
        console.log('Cookies: ', res._headers["set-cookie"]);
        return next();
    }


}


export default cookieController;