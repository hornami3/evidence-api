import { Schema, model } from 'mongoose';

interface Astronaut {
    firstName: string,
    lastName: string,
    superpower: string,
    dateOfBirth: Date,
};

const schema = new Schema<Astronaut>({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
    },
    superpower: {
        type: String,
        required: [true, 'Superpower is required'],
        trim: true,
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Date of birth is required']
    },
});

const Astronaut = model<Astronaut>('Astronaut', schema);

export default Astronaut;
