import mongoose from 'mongoose';
import tableConfig from '../config/tableConfig';
import { licensedEnum } from '../enums/licensedEnum';

interface People {
    name: string,
    cpf: string,
    birthDate: Date,
    email: string,
    password: string,
    licensed: licensedEnum
}

const peopleSchema = new mongoose.Schema<People>({
    name: { type: String, required: true },
    cpf: { type: String, required: true },
    birthDate: { type: Date, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    licensed: { type: String, required: true }
},
    tableConfig
);

export default mongoose.model<People>('People', peopleSchema);