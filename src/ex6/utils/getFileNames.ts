import * as fs from "node:fs/promises";
import * as path from "node:path";

export async function getFileNames(directoryPath: string): Promise<string[]> {
  try {
    const files = await fs.readdir(directoryPath);

    const fileNames: string[] = [];

    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const stats = await fs.stat(filePath);

      if (stats.isFile()) {
        fileNames.push(file);
      }
    }
    return fileNames;
  } catch (error) {
    console.error(`Error reading directory: ${error}`);
    return []; // Return an empty array on error
  }
}
