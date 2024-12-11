import {db, schema} from '../../config/dbConfig.js';
// import {query} from '../../db/query.js';


const getPoibyLotnoSearch = async (lotno_addr) => {

    
    const query = `SELECT st_astext(geom) as geom, * from ${schema}.poi WHERE lotno_addr like '%' || $1 || '%'`;
   

    try {

        const result = await db.query(query, [lotno_addr]);


        return result.rows;

    } catch (error) {

        console.error('Error DAO getPoiByLotnoSearch', error);
        
        throw new Error(error.message);
    }
}

const getPoibyRoadSearch = async (road_nm_addr) => {

    
    const query = `SELECT st_astext(geom) as geom, * from ${schema}.poi WHERE road_nm_addr like '%' || $1 || '%'`;

    try {

        const result = await db.query(query, [road_nm_addr]);


    } catch(error) {

        console.error('Error DAO getPoiByRoadSearch', error);

        throw new Error(error.message);
        
    }
}
export default {
    getPoibyLotnoSearch,
    getPoibyRoadSearch
}