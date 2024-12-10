import ctrl from './bldg.ctrl.js';
import express from 'express';

const router = express.Router();

router.get('/bldg_map', ctrl.getBldgByMap);

export default router;
