import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import databaseConfig from './config/database';
import routes from './routes/routes';

const app = express();

app.use(morgan('dev'));
mongoose.connect(`mongodb://${databaseConfig.host}/${databaseConfig.database}`);
mongoose.connection.once('open', () => { console.log('Connected DB') }).on('error', (error) => { console.log(error.message) });
routes(app);

export default app;