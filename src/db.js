import mongoose from "mongoose";

mongoose.set('debug', true);

const MONGO_URI = process.env.NODE_ENV === 'test' 
    ? process.env.MONGO_URI_TEST 
    : process.env.MONGO_URI_DEV;

export const connectDB = async () => {
    try {
        console.log(`Attempting to connect to MongoDB in ${process.env.NODE_ENV} mode...`);
        await mongoose.connect("mongodb+srv://100530075634ucla:030709wilson@cluster0.sladdbb.mongodb.net/test?retryWrites=true&w=majority");
        console.log(">>> MongoDB connected");
    } catch (error) {
        // console.log('Error connecting to MongoDB:', error);
        // console.error('Error details:', error.message, error.stack);
    }
};