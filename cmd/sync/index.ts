import fs from "fs";
import path from "path";

import { proCategories, variants } from "./data";
import AppDataSource from "../../src/config/datasource";
import Database from "../../src/config/database";
import IconVariantRepository from "../../src/app/repositories/iconVariant.repository";
import IconCategoryRepository from "../../src/app/repositories/iconCategory.repository";
import IconRepository from "../../src/app/repositories/icon.repository";
import IconEntity from "../../src/database/entities/Icon.entity";

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

  console.log("Initializing database connection...");
  await AppDataSource.initialize();
  console.log("Database connection initialized.");

  const datasource = Database.getInstance().getDataSource();

  let limit = 1,
    count = 0,
    total = 0;

  const iconVariantRepo = new IconVariantRepository();
  const iconCategoryRepo = new IconCategoryRepository();
  const iconRepo = new IconRepository();

  await datasource.transaction(async manager => {
    iconVariantRepo.setManager(manager);
    iconCategoryRepo.setManager(manager);
    iconRepo.setManager(manager);

    let finalIconData: Partial<IconEntity>[] = [];
    for (const variant of variants) {
      const variantData = await iconVariantRepo.findOne({
        where: {
          name: variant,
        },
      });

      for (const category of proCategories) {
        const categoryData = await iconCategoryRepo.findOne({
          where: {
            name: category.name,
          },
        });

        const folderPath = path.resolve(
          __dirname,
          `../../temp/pro`,
          variant,
          category.name
        );
        const files = readFilesInFolder(folderPath);

        for (let x = 0; x < files.length; x++) {
          finalIconData.push({
            name: files[x].name,
            svg: files[x].content,
            pro: 1,
            variant: variantData,
            category: categoryData,
          });
        }

        // console.log(
        //   `${categoryData.id}. ${variant} - ${category.name} - ${files.length}`
        // );

        total += files.length;
      }

      // count++;
      // if (count === limit) {
      //   console.log("Stopping at limit:", count);
      //   console.log("total:", total);
      //   break;
      // }
    }

    console.log("total:", total);
    console.log("finalIconData:", finalIconData.length);
    console.log(finalIconData[50]);

    // await iconRepo.insert(finalIconData);
  });

  console.log("Closing database connection...");
  await AppDataSource.destroy();
  console.log("Database connection closed.");

  process.exit();
};

sync();
