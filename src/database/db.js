import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const conection = () => {
    try {
        mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            //useCreateIndex: true
        });

        console.log(`Db Running on port ${process.env.MONGODB_URI}`);

    } catch (error) {
        console.error('Error', error);
    }
}

export default conection;