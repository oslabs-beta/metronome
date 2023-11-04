import express from 'express';
import cookieParser from'cookie-parser'; // Import the cookie-parser middleware
const app = express();
app.use(cookieParser()); // Use the cookie-parser middleware
import {db} from '../../backend/db/sqlmodel.js'

const projectController = {}

projectController.getProjects = async (req, res, next) => {
    res.locals.username = req.cookies.user
    const getIdQuery = `SELECT id 
    FROM users 
    WHERE username='${res.locals.username}'`
    const getIdResult =  await db.query(getIdQuery);
    const userId = getIdResult.rows[0].id;
    const getProjectsQuery = `SELECT project_name
    FROM projects
    WHERE user_id = (SELECT id FROM users WHERE id = '${userId}');`
    const getProjectsResult = await db.query(getProjectsQuery)
    const projectNames = getProjectsResult.rows.map(row => row.project_name);
    res.locals.projectNames = projectNames
    next()   
}

 projectController.addProjects = async (req, res, next) => {
    res.locals.project_name = req.body.project_name
    res.locals.username = req.cookies.user
    const getIdQuery = `SELECT id 
    FROM users 
    WHERE username='${res.locals.username}'`
    const getIdResult =  await db.query(getIdQuery);
    const userId = getIdResult.rows[0].id;
    const addProjectQuery =`INSERT INTO projects (project_name, user_id)
    VALUES ('${res.locals.project_name}', (SELECT id FROM users WHERE id = '${userId}'))`;
    const addProjectResult = await db.query(addProjectQuery);
    if(addProjectResult.rowCount === 1){
        next() 
    }
    else{
        console.log('Error processing request');
    }
}
projectController.setCookie = async (req, res, next) => {
    res.cookie('project_name', req.body.project_name,  { expires: new Date(Date.now() + (60*1000)), httpOnly: true })
    next()
}
export default projectController;