import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import { appConfig } from "../config/appConfig.js";

export const sendToAIService = async (file) => {
    try {
        const formData = new FormData();
        formData.append("image", fs.createReadStream(file.path));

        const response = await axios.post(appConfig.AI_SERVER_URL, formData, {
            headers: {
                ...formData.getHeaders(),
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
        });

        return response.data;
    } catch (error) {
        console.error("AI Service Error:", error.message);
        throw new Error("Failed to communicate with AI microservice");
    }
};
