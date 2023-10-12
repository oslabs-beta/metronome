import express from 'express';
import cookieParser from'cookie-parser'; // Import the cookie-parser middleware
const app = express();
app.use(cookieParser()); // Use the cookie-parser middleware

const cookieController = {
    setCookie (req, res, next) {
        res.cookie('id', res.locals.user.password)
        res.cookie('user', res.locals.user.username)
        return next();
    },
    verifyCookie(req,res,next){
        return next()
    }

}


export default cookieController;