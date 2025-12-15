import fs from "fs";
import path from "path";

export const saveBase64Image = (base64Data, folderName, prefix) => {
    const folder = `uploads/${folderName}`;
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
    }

    const fileName = `${prefix}-${Date.now()}.png`;
    const filePath = path.join(folder, fileName);

    const imageBuffer = Buffer.from(base64Data, "base64");

    fs.writeFileSync(filePath, imageBuffer);

    return filePath;
};
