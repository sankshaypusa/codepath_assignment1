import pg from 'pg';

const config = {
    user: 'postgres',
    password: 'postgres-pd_m.railway.internal',
    host: 'postgres-pd_m.railway.internal',
    port: 5432,
    database: 'railway',
};

export const pool = new pg.Pool(config);

