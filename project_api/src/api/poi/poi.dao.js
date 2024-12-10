import {db} from '../../config/dbConfig.js';
import {query} from '../../db/query.js';


const getPoibyLotnoSearch = async (req, res) => {

    const lotno_addr = String(req.body.lotno_addr);
    const LotnoQuery = query.getPoiByLotnoSearch;
   

    try {

        const result = await db.query(LotnoQuery, [lotno_addr]);

        res.status(200).json({
            success : true,
            message : 'Lotno_addr search success',
            data : result.rows
        })

        return result.rows;

    } catch (error) {

        console.error('Error DAO getPoiByLotnoSerch', error);
        
        throw new Error(error.message);
    }
}

const getPoibyRoadSearch = async (req, res) => {

    const road_nm_addr = String(req.body.road_nm_addr);
    const RoadQuery = query.getPoiByRoadSearch;

    try {

        const result = await db.query(RoadQuery, [road_nm_addr]);

        res.status(200).json({
            success : true,
            message : 'Road_nm_addr search success',
            data : result.rows
        })

        return result.rows;

    } catch(error) {

        console.error('Error DAO getPoiByRoadSerch', error);

        throw new Error(error.message);
        
    }
}
export default {
    getPoibyLotnoSearch,
    getPoibyRoadSearch
}