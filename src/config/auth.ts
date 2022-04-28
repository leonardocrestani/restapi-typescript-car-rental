import dotenv from 'dotenv';
dotenv.config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env.local',
});

const authConfig = {
    secret: process.env.SECRET_KEY_JWT
}

export default authConfig;