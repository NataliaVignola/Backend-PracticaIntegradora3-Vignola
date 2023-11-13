import mongoose from 'mongoose';
import config from '../config';

export const dbConnection = async () => {
    try {
        await mongoose.connect(config.mongoURI);
        console.log('DB conectada');
    } catch (error) {
        console.log(error);
    }
};
