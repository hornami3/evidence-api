import mongoose from 'mongoose';
import { config } from 'dotenv';

config({ path: './src/config/config.env' });

import app from './app';
import endpoints from './config/endpoints.config';

const uri: string = endpoints.DATABASE.replace('<password>', endpoints.DATABASE_PASSWORD);

mongoose
    .connect(uri)
    .then(() => console.log('DB connection successfull'))
    .catch(() => {
        console.log('Database connection failed!')
        process.exit(1)
    });

app.listen(endpoints.PORT, () => {
    console.log(`Server is listening on port ${endpoints.PORT}`);
});