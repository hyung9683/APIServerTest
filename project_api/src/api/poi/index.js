import express from 'express';
import ctrl from './poi.crtl.js';

const router = express.Router();

router.get('/poi_lotno', ctrl.getPoibyLotnoSerch);
router.get('/poi_road', ctrl.getPoibyRoadSerch);

export default router;
