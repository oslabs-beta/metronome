import express from 'express';
import cookieParser from'cookie-parser'; // Import the cookie-parser middleware
const app = express();
app.use(cookieParser()); // Use the cookie-parser middleware

const cookieController = {
    setCookie (req, res, next) {
        console.log('received user data:' , res.locals.user)
        res.cookie('id', res.locals.user.id)
        console.log('Cookies: ', res._headers["set-cookie"]);
        return next();
    },
    verifyCookie(req,res,next){
        console.log("verifying cookie")
        console.log(req.cookies)
       return next()

    }

}


export default cookieController;