import express from 'express';
import { nodeMailerCtrl, sendGridCtrl } from '../controller/sendGrid.js';


const router = express.Router();

router.post('/emailAPI', sendGridCtrl)
router.post('/emailAPIs', nodeMailerCtrl)



export default router