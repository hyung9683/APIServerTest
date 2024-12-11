import {db, schema} from '../../config/dbConfig.js';

const getBldgByMap = async () => {

    
    const query = `SELECT st_astext(geom) as geom, bldg_id, bldg_sn, rds_sn, sig_cd, emd_cd, lotno_addr, road_nm_addr, bldg_nm, gro_flo_co, und_flo_co, bdtyp_Cd, crt_dt, mdfcn_dt, recent_poi_dtl_crt_dt from ${schema}.bldg`;

    try {

        const result = await db.query(query);

        console.log(result.rows);
        return result.rows;
        
    } catch (error) {

        console.error('Error DAO getBldgByMap', error);

        throw new Error(error.message);
        
    }
}

export default {
    getBldgByMap
}