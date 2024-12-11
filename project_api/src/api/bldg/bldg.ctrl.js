import bldgDao from './bldg.dao.js';

const getBldgByMap = async (req, res) => {
    

    if(!bldgDao.getBldgByMap()) {

        res.status(400).json({success : false, message : 'map data is required'});
        return;
    }

    try {

        const bldg = await bldgDao.getBldgByMap();

        res.json({
            success : true,
            message : 'Bldg fetched successfully',
            data : bldg.length === 0 ? [] : bldg 
        })
    } catch (error) {

        console.error('Error in ctrl getBldgByMap', error);

        const errorMessage = error.message;

        res.status(500).json({
            success : false,
            message : errorMessage
        });
        
    }
}

export default {
    getBldgByMap
}