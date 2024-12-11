import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
    host : process.env.CLOUD_HOST,
    port : process.env.CLOUDSQL_PORT ? parseInt(process.env.CLOUDSQL_PORT, 10) : 5432,
    database : process.env.CLOUDSQL_DB,
    user : process.env.CLOUDSQL_USER_CODELAB,
    password : process.env.CLOUDESQL_PASS_CODELAB,
};



export const db = new pg.Pool(dbConfig);
export const schema = process.env.CODELAB_SCHEMA;