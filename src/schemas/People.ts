import mongoose from 'mongoose';
import tableConfig from '../config/tableConfig';
import { licensedEnum } from '../enums/licensedEnum';
import bcrypt from 'bcrypt';

interface IPeople {
    name: string,
    cpf: string,
    birthDate: Date,
    email: string,
    password: string,
    licensed: licensedEnum
}

const PeopleSchema = new mongoose.Schema<IPeople>({
    name: { type: String, required: true },
    cpf: { type: String, required: true },
    birthDate: { type: Date, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    licensed: { type: String, required: true }
},
    tableConfig
);

PeopleSchema.pre('save', async function () {
    const hashPassword = await bcrypt.hash(this.password, 10);
    this.password = hashPassword;
});

export default mongoose.model<IPeople>('People', PeopleSchema);