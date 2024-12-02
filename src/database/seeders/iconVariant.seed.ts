import Database from "@config/database";
import IconVariantEntity from "@entities/IconVariant.entity";
import IconVariantRepository from "@repository/iconVariant.repository";
import LoggerManager from "@utilities/logger";
import { DataSource } from "typeorm";
import { Logger } from "winston";

export default class IconVariantSeeder {
  private repo: IconVariantRepository;
  private log: Logger;
  private dataSource: DataSource;

  private data: Partial<IconVariantEntity>[] = [
    { name: "Line" },
    { name: "Duocolor" },
    { name: "Solid" },
    { name: "Duotone" },
    { name: "Gestalt" },
  ];

  constructor() {
    this.repo = new IconVariantRepository();
    this.log = LoggerManager.getInstance().get("app");
    this.dataSource = Database.getInstance().getDataSource();
  }

  async run() {
    await this.dataSource.transaction(async manager => {
      this.repo.setManager(manager);

      try {
        await this.repo.insert(this.data);
      } catch (err) {
        this.log.error(`seeding icon variant error:\n`, err);
        throw err;
      }
    });
  }
}
