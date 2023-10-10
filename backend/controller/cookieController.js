import express from 'express';
import cookieParser from'cookie-parser'; // Import the cookie-parser middleware
const app = express();
app.use(cookieParser()); // Use the cookie-parser middleware

const cookieController = {
    setCookie (req, res, next) {
        res.cookie('id', res.locals.user.password, { expires: new Date(Date.now() + 900000), httpOnly: true })
        res.cookie('user', res.locals.user.username, { expires: new Date(Date.now() + 900000), httpOnly: true })
        return next();
    },
    verifyCookie(req,res,next){
        return next()
    }

}


export default cookieController;