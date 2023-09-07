import {db} from '../db/sqlmodel.js';
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage });
import express from 'express';
import ViteExpress from 'vite-express';

const dataController ={};

//getJsonFile saves the uploaded json file to res.locals
dataController.getJsonFile = async (req, res, next)=>{
    // upload.single('file');
    console.log('i am in dataController.getJsonFile');
    try{

        const uploadedFile = req.file;
        if(!uploadedFile){
            return res.status(400).json({error:"No file uploaded"});
        }
        const jsonData=JSON.parse(uploadedFile.buffer.toString());
        //save to res.locals.JsonFile
        res.locals.JsonFile=jsonData;
        return next();

    }
    catch(err){
        console.error(err);
        res.status(500).json({error:"An error occured in dataController.getJsonFile"});

        return next(err);
    }
}

//getOverviewdata
dataController.getOverview = async(req,res,next)=>{
    console.log('i am in dataController.getOverview');
    try{
        const Jsondata=res.locals.JsonFile;
        res.locals.version=Jsondata.version;
        res.locals.totalRender=Jsondata.timelineData[0].duration;
        console.log(res.locals.version, 'version');
        console.log(res.locals.totalRender,'renderTime');
        return next();
    }
    catch(err){
        return next(err);
    }
}
export default dataController;
