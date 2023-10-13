import express from 'express';
const router = express.Router();

import projectController from '../controller/projectController.js'

router.get('/getProjects', projectController.getProjects, (req, res)=> {
    res.status(200).send(res.locals.projectNames)
});

router.post('/addProjects', projectController.addProjects, (req, res)=>{
    res.status(200).send('ok')
});

export default router;