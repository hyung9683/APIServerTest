import {schema} from '../config/dbConfig.js';

export const query = {
    // 건물 폴리곤 설정
    getBldgByMap : `SELECT * from ${schema}.bldg`,


    // 매장 검색에 따른 point 위치
    getPoiByLotnoSearch : `SELECT st_astext(geom) as geom, * from ${schema}.poi WHERE lotno_addr like '%' || $1 || '%'`,

    getPoiByRoadSearch : `SELECT st_astext(geom) as geom, * from ${schema}.poi WHERE road_nm_addr like '%' || $2 || '%'`

}