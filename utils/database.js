import mongoose from "mongoose";

let isConnected = false; //track the connnection 

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected) {
        console.log('Mongo is Already connected ');
        return;
    } 
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedToPology: true,
        })
        isConnected =true,
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error)
    }
}