import mongoose from "mongoose";
const mongoURI = process.env.URI || "mongodb://127.0.0.1:27017/contactms";

const Connection = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Success: Mongoose Connected to MongoDB!");
    } catch (err) {
        console.log("Mongoose Connection Error: " + err.message);
    }
};
Connection();

export default Connection;
