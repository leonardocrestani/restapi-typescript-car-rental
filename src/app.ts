import express from 'express';
import mongoose from 'mongoose';
import databaseConfig from './config/database';
import routes from './routes/routes';
import errorMiddleware from './middlewares/errorMiddleware';

const app = express();

mongoose.connect(`mongodb://db:27017`);
mongoose.connection.once('open', () => { console.log('Connected DB'); }).on('error', (error) => { console.log(error.message); });
routes(app);
app.use(errorMiddleware);

export default app;
