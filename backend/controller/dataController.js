import {db} from '../db/sqlmodel.js';
import express from 'express';
import cookieParser from'cookie-parser'; // Import the cookie-parser middleware
const app = express();
app.use(cookieParser()); // Use the cookie-parser middleware
// // const storage = multer.memoryStorage(); // Store the file in memory
// const upload = multer({ storage });
// import express from 'express';
// import ViteExpress from 'vite-express';

const dataController ={};
let parsedJsonData=null;

//getJsonFile saves the uploaded json file to res.locals
dataController.getJsonFile = async (req, res, next)=>{
    // upload.single('file');
    try{
        // cosole.log(req.file,'i am req.file');
        const uploadedFile = req.file;
        if(!uploadedFile){
            return res.status(400).json({error:"No file uploaded"});
        }
        const jsonData=JSON.parse(uploadedFile.buffer.toString());

        parsedJsonData = jsonData;
        res.locals.JsonFile=jsonData;
        console.log(res.locals.JsonFile,'i am res.locals.JsonFile');
        return next();

    }
    catch(err){
        console.error(err);
        res.status(500).json({error:"An error occured in dataController.getJsonFile"});

        return next(err);
    }
}

//getOverviewdata
dataController.getMetrics = async(req,res,next)=>{
    console.log('i am in dataController.getMetrics');
    console.log(parsedJsonData,'');
    try {
        if (parsedJsonData) {
            res.locals.metricsData=parsedJsonData;
            console.log(res.locals.metricsData, 'i am in res.locals.metricsData')
            return next();
        } else {
            // Handle the case where parsedJsonData is not available
            console.log('no data uploaded yet for the dashboard');
        }
        // return next();
    } catch (err) {
        return next(err);
    }
}

dataController.saveExtensionData = async(req, res, next)=>{
    const receivedData = req.body
    const username = req.cookies.user
    const queryStr = `SELECT * FROM users WHERE username = '${email}';`;
}
export default dataController;
