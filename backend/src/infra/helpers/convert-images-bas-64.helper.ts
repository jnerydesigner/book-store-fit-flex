import { promises as fs } from "fs";
import path from "path";

export const getBase64 = async (imageName: string): Promise<string | null> => {
  const imagePath = `./src/infra/images/${imageName}`;
  try {
    const fileBuffer = await fs.readFile(imagePath);
    let strFileBuffer = fileBuffer.toString("base64");
    strFileBuffer = `data:image/jpeg;base64,${strFileBuffer}`;

    return strFileBuffer;
  } catch (error) {
    console.error("Error reading file:", error);
    return null;
  }
};
