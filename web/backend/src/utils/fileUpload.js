import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure folder exists
const ensureFolder = (folderPath) => {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = "uploads/original";
        ensureFolder(folder);
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

export const uploadSingle = (fieldName) => multer({ storage }).single(fieldName);
