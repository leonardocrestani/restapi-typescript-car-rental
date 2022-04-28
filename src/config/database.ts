import dotenv from 'dotenv';
dotenv.config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env.local',
});

const databaseConfig = {
    host: process.env.DATABASE_HOST,
    name: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT
}

export default databaseConfig;