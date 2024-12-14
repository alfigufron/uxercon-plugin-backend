import IconRepository from "@app/repositories/icon.repository";
import IconCategoryRepository from "@app/repositories/iconCategory.repository";
import IconVariantRepository from "@app/repositories/iconVariant.repository";
import Database from "@config/database";
import IconEntity from "@entities/Icon.entity";
import LoggerManager from "@utilities/logger";
import { DataSource } from "typeorm";
import { Logger } from "winston";

export default class IconSeeder {
  private repo: IconRepository;
  private log: Logger;
  private dataSource: DataSource;

  private iconCategoryRepo: IconCategoryRepository;
  private iconVariantRepo: IconVariantRepository;

  private data: Partial<IconEntity>[] = [
    {
      name: "audio-description-slash",
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="3" stroke="black" stroke-width="2"/>
        <path d="M13 6C13 6.55228 12.5523 7 12 7C11.4477 7 11 6.55228 11 6C11 5.44772 11.4477 5 12 5C12.5523 5 13 5.44772 13 6Z" fill="#667085"/>
        <path d="M13 18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18C11 17.4477 11.4477 17 12 17C12.5523 17 13 17.4477 13 18Z" fill="#667085"/>
        <path d="M16.9498 8.46447C16.5592 8.85499 15.9261 8.85499 15.5355 8.46447C15.145 8.07394 15.145 7.44078 15.5355 7.05025C15.9261 6.65973 16.5592 6.65973 16.9498 7.05025C17.3403 7.44078 17.3403 8.07394 16.9498 8.46447Z" fill="#667085"/>
        <path d="M8.46447 16.9497C8.07395 17.3403 7.44078 17.3403 7.05026 16.9497C6.65973 16.5592 6.65973 15.9261 7.05026 15.5355C7.44078 15.145 8.07395 15.145 8.46447 15.5355C8.855 15.9261 8.855 16.5592 8.46447 16.9497Z" fill="#667085"/>
        <path d="M8.46447 7.05025C8.85499 7.44078 8.85499 8.07394 8.46447 8.46447C8.07395 8.85499 7.44078 8.85499 7.05026 8.46447C6.65973 8.07394 6.65973 7.44078 7.05026 7.05025C7.44078 6.65973 8.07395 6.65973 8.46447 7.05025Z" fill="#667085"/>
        <path d="M16.9498 15.5355C17.3403 15.9261 17.3403 16.5592 16.9498 16.9497C16.5592 17.3403 15.9261 17.3403 15.5355 16.9497C15.145 16.5592 15.145 15.9261 15.5355 15.5355C15.9261 15.145 16.5592 15.145 16.9498 15.5355Z" fill="#667085"/>
        <path d="M6 10.9999C6.55228 10.9999 7 11.4477 7 11.9999C7 12.5522 6.55228 12.9999 6 12.9999C5.44772 12.9999 5 12.5522 5 11.9999C5 11.4477 5.44772 10.9999 6 10.9999Z" fill="#667085"/>
        <path d="M18 10.9999C18.5523 10.9999 19 11.4477 19 11.9999C19 12.5522 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 12.5522 17 11.9999C17 11.4477 17.4477 10.9999 18 10.9999Z" fill="#667085"/>
        </svg>`,
    },
    {
      name: "brightness",
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="3" stroke="black" stroke-width="2"/>
        <path d="M13 6C13 6.55228 12.5523 7 12 7C11.4477 7 11 6.55228 11 6C11 5.44772 11.4477 5 12 5C12.5523 5 13 5.44772 13 6Z" fill="#667085"/>
        <path d="M13 18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18C11 17.4477 11.4477 17 12 17C12.5523 17 13 17.4477 13 18Z" fill="#667085"/>
        <path d="M16.9498 8.46447C16.5592 8.85499 15.9261 8.85499 15.5355 8.46447C15.145 8.07394 15.145 7.44078 15.5355 7.05025C15.9261 6.65973 16.5592 6.65973 16.9498 7.05025C17.3403 7.44078 17.3403 8.07394 16.9498 8.46447Z" fill="#667085"/>
        <path d="M8.46447 16.9497C8.07395 17.3403 7.44078 17.3403 7.05026 16.9497C6.65973 16.5592 6.65973 15.9261 7.05026 15.5355C7.44078 15.145 8.07395 15.145 8.46447 15.5355C8.855 15.9261 8.855 16.5592 8.46447 16.9497Z" fill="#667085"/>
        <path d="M8.46447 7.05025C8.85499 7.44078 8.85499 8.07394 8.46447 8.46447C8.07395 8.85499 7.44078 8.85499 7.05026 8.46447C6.65973 8.07394 6.65973 7.44078 7.05026 7.05025C7.44078 6.65973 8.07395 6.65973 8.46447 7.05025Z" fill="#667085"/>
        <path d="M16.9498 15.5355C17.3403 15.9261 17.3403 16.5592 16.9498 16.9497C16.5592 17.3403 15.9261 17.3403 15.5355 16.9497C15.145 16.5592 15.145 15.9261 15.5355 15.5355C15.9261 15.145 16.5592 15.145 16.9498 15.5355Z" fill="#667085"/>
        <path d="M6 10.9999C6.55228 10.9999 7 11.4477 7 11.9999C7 12.5522 6.55228 12.9999 6 12.9999C5.44772 12.9999 5 12.5522 5 11.9999C5 11.4477 5.44772 10.9999 6 10.9999Z" fill="#667085"/>
        <path d="M18 10.9999C18.5523 10.9999 19 11.4477 19 11.9999C19 12.5522 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 12.5522 17 11.9999C17 11.4477 17.4477 10.9999 18 10.9999Z" fill="#667085"/>
        </svg>`,
    },
    {
      name: "keyboard-brightness-low",
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 9L12 10M7 11L7.75734 11.7574M17 11L16.2426 11.7574M19 16L18 16M5 16L5.99998 16" stroke="#667085" stroke-width="2" stroke-linecap="round"/>
        <path d="M10 16L14 16" stroke="black" stroke-width="2" stroke-linecap="round"/>
        </svg>`,
    },
  ];

  constructor() {
    this.repo = new IconRepository();
    this.log = LoggerManager.getInstance().get("app");
    this.dataSource = Database.getInstance().getDataSource();

    this.iconCategoryRepo = new IconCategoryRepository();
    this.iconVariantRepo = new IconVariantRepository();
  }

  async run() {
    await this.dataSource.transaction(async manager => {
      this.repo.setManager(manager);

      try {
        const category = await this.iconCategoryRepo.find();
        const variant = await this.iconVariantRepo.find();

        let finalData: Partial<IconEntity>[] = [];
        // Variant
        for (let x = 0; x < 5; x++) {
          // Category
          for (let y = 0; y < 36; y++) {
            for (let z = 0; z < 24; z++) {
              for (const icon of this.data) {
                finalData.push({
                  ...icon,
                  category: category[y],
                  variant: variant[x],
                });
              }
            }
          }
        }

        await this.repo.insert(finalData);
      } catch (err) {
        this.log.error(`seeding icon category error:\n`, err);

        throw err;
      }
    });
  }
}
