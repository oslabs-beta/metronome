import express from 'express';
import cookieParser from'cookie-parser'; // Import the cookie-parser middleware
const app = express();
app.use(cookieParser()); // Use the cookie-parser middleware
import {db} from '../../backend/db/sqlmodel.js'

const versionController = {}

versionController.getVersions = async (req, res, next) => {
    res.locals.username = req.cookies.user
    res.locals.project_name = req.cookies.project_name
    const getVersionsQuery = `SELECT versions.version_name
    FROM versions
    JOIN projects ON versions.project_id = projects.id
    JOIN users ON projects.user_id = users.id
    WHERE users.username = '${res.locals.username}' AND projects.project_name = '${res.locals.project_name}';`;
    const getVersionsResult = await db.query(getVersionsQuery)
    console.log(getVersionsResult)
    const versionNames = getVersionsResult.rows.map(row => row.version_name);
    res.locals.versionNames = versionNames
    next()   
}

 versionController.addVersions = async (req, res, next) => {
    console.log(req.body.version_name)
    res.locals.version_name = req.body.version_name
    res.locals.project_name = req.cookies.project_name
    res.locals.username = req.cookies.user
    const addVersionQuery =`WITH user_project AS (
        SELECT users.id AS user_id, projects.id AS project_id
        FROM users
        JOIN projects ON users.id = projects.user_id
        WHERE users.username = '${res.locals.username}' AND projects.project_name = '${res.locals.project_name}'
    )
    INSERT INTO versions (project_id, version_name)
    SELECT project_id, '${req.body.version_name}'
    FROM user_project;`;
    const addVersionResult = await db.query(addVersionQuery);
    console.log(addVersionResult)
    if(addVersionResult.rowCount === 1){
        console.log('added succesfully')
        next() 
    }
    else{
        console.log('Error processing request');
    }
}
versionController.setCookie = async (req, res, next) => {
    res.cookie('version_name', req.body.version_name, { expires: new Date(Date.now() + (60*1000)), httpOnly: true })
    next()
}
export default versionController;


// Yes, it is possible to get the id from a provided username in the users table and the id from a provided project_name in the projects table in a single query. You can use a JOIN operation to combine rows from two or more tables based on a related column between them. Here is an example of how you can do it:
// SELECT users.id AS user_id, projects.id AS project_id
// FROM

// In this query, replace 'provided_username' and 'provided_project_name' with the actual username and project name you are looking for. This query will return the user_id and project_id for the provided username and project name.