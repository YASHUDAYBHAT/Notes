import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDb is successfully connected");
}catch (error) {
    console.error("Not connected DB successfully", error);

}
};

export default connectDB;