import express from 'express';
const router = express.Router();

import versionController from '../controller/versionController.js'

router.get('/getVersions', versionController.getVersions, (req, res)=> {
    res.status(200).send(res.locals.versionNames)
});

router.post('/addVersions', versionController.addVersions, versionController.setCookie, (req, res)=>{
    res.status(200).send('ok')
});

router.post('/setVersion', versionController.setCookie, (req, res)=>{
    res.status(200).send('ok')
});

export default router;