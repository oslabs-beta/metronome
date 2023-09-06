import {db} from '../db/sqlmodel.js';

const dataController ={};

dataController.getJsonFile = async (req, res, next)=>{
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

export default dataController;
