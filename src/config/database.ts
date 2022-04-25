import dotenv from 'dotenv';
dotenv.config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env.local',
});

const databaseConfig = {
    host: process.env.DATABASE_HOST
}

export default databaseConfig;