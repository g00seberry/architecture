import * as fs from "node:fs/promises";

export async function getSourceFileContent(
  filePath: string
): Promise<string | null> {
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    return fileContent;
  } catch (error) {
    console.error(`Error reading file: ${error}`);
    return null; // Indicate error by returning null
  }
}
