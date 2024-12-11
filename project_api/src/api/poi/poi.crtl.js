import poiDao from './poi.dao.js';

const getPoibyLotnoSearch = async (req, res) => {

    const lotno_addr = String(req.body.lotno_addr);

    if(!lotno_addr) {

        res.status(400).json({success: false, message : 'lotno_addr is required'});

        console.log(lotno_addr);
        
        return;
    }

    try {

        const poi = await poiDao.getPoibyLotnoSearch(lotno_addr);

        console.log(poi);
        

        res.json({success : true, message : 'User fetched successfully', data : poi.lenght === 0 ? [] : poi})

    } catch (error) {

        console.error('Error in ctrl getPoiLotnoSerch', error);
        
        const errorMessage = error.message;

        res.status(500).json({success : false, message : errorMessage})
        
    }
}

const getPoibyRoadSearch = async (req, res) => {

    const road_nm_addr = String(req.body.road_nm_addr);

    if(!road_nm_addr) {

        res.status(400).json({success: false, message : 'road_nm_addr is required'});
        console.log(road_nm_addr);
        
        return;
    }

    try {

        const poi = await poiDao.getPoibyRoadSearch(road_nm_addr);

        console.log(poi);

            res.json({success : true, message : 'User fetched successfully', data : poi.lenght === 0 ? [] : poi})

    } catch (error) {

        console.error('Error in ctrl getPoiRoadSerch', error);
        
        const errorMessage = error.message;

        res.status(500).json({success : false, message : errorMessage})
        
    }
}

export default {
    getPoibyLotnoSearch,
    getPoibyRoadSearch   
}