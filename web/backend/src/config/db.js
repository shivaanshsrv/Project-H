import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "ProjectH"
        });

        console.log("✅ MongoDB Connected Successfully");
    } catch (err) {
        console.log("❌ MongoDB Error:", err.message);
        process.exit(1);
    }
};
