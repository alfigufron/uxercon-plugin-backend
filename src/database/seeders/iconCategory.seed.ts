import IconCategoryRepository from "@app/repositories/iconCategory.repository";
import Database from "@config/database";
import IconCategoryEntity from "@entities/IconCategory.entity";
import LoggerManager from "@utilities/logger";
import { DataSource } from "typeorm";
import { Logger } from "winston";

export default class IconCategorySeeder {
  private repo: IconCategoryRepository;
  private log: Logger;
  private dataSource: DataSource;

  private data: Partial<IconCategoryEntity>[] = [
    { name: "Accessibility", version: 1 },
    { name: "Alert & Feedback", version: 1 },
    { name: "Arrows", version: 1 },
    { name: "Alphabet", version: 2 },
    { name: "Animal & Pet", version: 3 },
    { name: "Animation", version: 3 },
    { name: "AR & VR", version: 3 },
    { name: "Artificial Intelligence", version: 3 },
    { name: "Automotive", version: 3 },
    { name: "Building", version: 2 },
    { name: "Camping & Nature", version: 3 },
    { name: "Charity & Love", version: 3 },
    { name: "Charts & Graphs", version: 1 },
    { name: "Clothing & Fashion", version: 2 },
    { name: "Communication", version: 1 },
    { name: "Construction", version: 3 },
    { name: "Cryptocurrency", version: 3 },
    { name: "Date & Time", version: 1 },
    { name: "Design & Editor", version: 1 },
    { name: "Development", version: 1 },
    { name: "Device & Electronic", version: 1 },
    { name: "Education", version: 2 },
    { name: "Emojis", version: 2 },
    { name: "Energy & Electricity", version: 3 },
    { name: "Festivity", version: 3 },
    { name: "File & Folder", version: 1 },
    { name: "Film & Video", version: 2 },
    { name: "Filter & Sort", version: 3 },
    { name: "Finance & Payment", version: 1 },
    { name: "Food & Beverage", version: 3 },
    { name: "Gaming", version: 3 },
    { name: "Hand & Gesture", version: 3 },
    { name: "Household & Interiors", version: 2 },
    { name: "Images & Photos", version: 1 },
    { name: "Investment & Stock", version: 3 },
    { name: "Layout", version: 1 },
    { name: "Legal & Policy", version: 3 },
    { name: "Map & Navigation", version: 1 },
    { name: "Mathematics", version: 2 },
    { name: "Medicine & Health", version: 3 },
    { name: "Music & Audio", version: 2 },
    { name: "Network & Wifi", version: 3 },
    { name: "Numbers", version: 2 },
    { name: "Religion", version: 3 },
    { name: "Security", version: 1 },
    { name: "Shapes", version: 2 },
    { name: "Shipment & Delivery", version: 3 },
    { name: "Shopping & Ecommerce", version: 1 },
    { name: "Social Media & Branding", version: 2 },
    { name: "Space & Galaxy", version: 3 },
    { name: "Spinner", version: 1 },
    { name: "Sport & Fitness", version: 2 },
    { name: "Technology", version: 2 },
    { name: "Toggle", version: 1 },
    { name: "Transportation", version: 2 },
    { name: "Travel & Hotel", version: 2 },
    { name: "User Interface", version: 1 },
    { name: "Users & People", version: 1 },
    { name: "Weather", version: 2 },
    { name: "Web3 & Blockchain", version: 2 },
  ];

  constructor() {
    this.repo = new IconCategoryRepository();
    this.log = LoggerManager.getInstance().get("app");
    this.dataSource = Database.getInstance().getDataSource();
  }

  async run() {
    await this.dataSource.transaction(async manager => {
      this.repo.setManager(manager);

      try {
        await this.repo.insert(this.data);
      } catch (err) {
        this.log.error(`seeding icon category error:\n`, err);
        throw err;
      }
    });
  }
}
