import express from 'express';
import ctrl from './poi.crtl.js';

const router = express.Router();

router.get('/poi_lotno', ctrl.getPoibyLotnoSearch);
router.get('/poi_road', ctrl.getPoibyRoadSearch);

export default router;
