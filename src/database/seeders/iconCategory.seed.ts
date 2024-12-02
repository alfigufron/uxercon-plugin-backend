import Database from "@config/database";
import IconCategoryEntity from "@entities/IconCategory.entity";
import IconCategoryRepository from "@repository/iconCategory.repository";
import LoggerManager from "@utilities/logger";
import { DataSource } from "typeorm";
import { Logger } from "winston";

export default class IconCategorySeeder {
  private repo: IconCategoryRepository;
  private log: Logger;
  private dataSource: DataSource;

  private data: Partial<IconCategoryEntity>[] = [
    { name: "Accessibility", version: 1 },
    { name: "Alerts & Feedback", version: 1 },
    { name: "Arrows", version: 1 },
    { name: "Charts & Graphs", version: 1 },
    { name: "Communication", version: 1 },
    { name: "Date & Time", version: 1 },
    { name: "Design & Editor", version: 1 },
    { name: "Development", version: 1 },
    { name: "Device & Electronic", version: 1 },
    { name: "File & Folder", version: 1 },
    { name: "Finance & Payment", version: 1 },
    { name: "Images & Photos", version: 1 },
    { name: "Layout", version: 1 },
    { name: "Map & Navigation", version: 1 },
    { name: "Security", version: 1 },
    { name: "Shopping & Ecommerce", version: 1 },
    { name: "Spinner", version: 1 },
    { name: "Toggle", version: 1 },
    { name: "User Interface", version: 1 },
    { name: "Users & People", version: 1 },
    { name: "Alphabet", version: 2 },
    { name: "Automotive", version: 2 },
    { name: "Building", version: 2 },
    { name: "Clothing & Fashion", version: 2 },
    { name: "Education", version: 2 },
    { name: "Emojis", version: 2 },
    { name: "Film & Video", version: 2 },
    { name: "Household & Interiors", version: 2 },
    { name: "Mathematics", version: 2 },
    { name: "Music & Audio", version: 2 },
    { name: "Numbers", version: 2 },
    { name: "Shapes", version: 2 },
    { name: "Social Media & Branding", version: 2 },
    { name: "Sport & Fitness", version: 2 },
    { name: "Technology", version: 2 },
    { name: "Transportation", version: 2 },
    { name: "Travel & Hotel", version: 2 },
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
