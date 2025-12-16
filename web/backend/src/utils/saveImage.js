import fs from "fs/promises";
import path from "path";

export const saveBase64Image = async (base64Data, folderName, prefix) => {
    const folder = `uploads/${folderName}`;

    await fs.mkdir(folder, { recursive: true });

    const fileName = `${prefix}-${Date.now()}.png`;
    const filePath = path.join(folder, fileName);

    const buffer = Buffer.from(base64Data, "base64");

    await fs.writeFile(filePath, buffer);

    return filePath;
};
