import poiDao from './poi.dao.js';

const getPoibyLotnoSerch = async (req, res) => {

    const lotno_addr = req.params.lotno_addr;

    if(!lotno_addr) {

        res.status(400).json({success: false, message : 'lotno_addr is required'});
        return;
    }

    try {

        const poi = await poiDao.getPoibyLotnoSerch(lotno_addr);

        res.json({success : true, message : 'User fetched successfully', data : poi.lenght === 0 ? [] : poi})

    } catch (error) {

        console.error('Error in ctrl getPoiLotnoSerch', error);
        
        const errorMessage = error.message;

        res.status(500).json({success : false, message : errorMessage})
        
    }
}

const getPoibyRoadSerch = async (req, res) => {

    const road_nm_addr = req.params.road_nm_addr;

    if(!road_nm_addr) {

        res.status(400).json({success: false, message : 'road_nm_addr is required'});
        return;
    }

    try {

        const poi = await poiDao.getPoibyRoadSerch(road_nm_addr);

            res.json({success : true, message : 'User fetched successfully', data : poi.lenght === 0 ? [] : poi})

    } catch (error) {

        console.error('Error in ctrl getPoiRoadSerch', error);
        
        const errorMessage = error.message;

        res.status(500).json({success : false, message : errorMessage})
        
    }
}

export default {
    getPoibyLotnoSerch,
    getPoibyRoadSerch   
}