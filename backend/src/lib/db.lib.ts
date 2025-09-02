import mongoose from 'mongoose';

export const connectDB = async ():promise<void> => {
    try {
        const connects = await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("MongoDB connected: ${connects.connection.host}");
    } catch(error){
        console.log("MongoDB connection error:", error);
        process.exit(1);//Kill app if DB fail
    }
};
