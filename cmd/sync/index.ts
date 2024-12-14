import fs from "fs";
import path from "path";

import { categories, variants } from "./data";

const readFilesInFolder = (
  folderPath: string,
  fileExtension: string = ".svg"
) => {
  const files: { name: string; content: string }[] = [];

  const readFolder = (currentPath: string) => {
    const items = fs.readdirSync(currentPath);

    items.forEach(item => {
      const fullPath = path.join(currentPath, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        readFolder(fullPath);
      } else if (stat.isFile() && fullPath.endsWith(fileExtension)) {
        const content = fs.readFileSync(fullPath, "utf-8");
        files.push({ name: item, content });
      }
    });
  };

  readFolder(folderPath);
  return files;
};

// TODO: Clear Folder Structure same like a figma
const sync = async () => {
  console.clear();

  let limit = 1,
    count = 0;

  for (const variant of variants) {
    for (const category of categories) {
      // console.log(variant, category.name, category.version);
      const folderPath = path.resolve(
        __dirname,
        `../../temp/assets/${variant} Icons/${category.name}`
      );
      const files = readFilesInFolder(folderPath);

      console.log(files);

      count++;
      if (count === limit) {
        console.log("Stopping at limit:", count);
        break;
      }
    }
    if (count === limit) break;
  }

  process.exit();
};

sync();
