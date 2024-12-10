import {db, schema} from '../../config/dbConfig.js';

const getBldgByMap = async () => {

    const query = `SELECT * from ${schema}.bldg`;

    try {

        const result = await db.query(query);

        return results.rows;
    } catch (error) {

        console.error('Error DAO getBldgByMap', error);

        throw new Error(error.message);
        
    }
}

export default {
    getBldgByMap
}