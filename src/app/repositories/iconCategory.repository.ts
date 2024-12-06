import Database from "@config/database";
import IconCategoryEntity from "@database/entities/IconCategory.entity";
import PaginationUtils from "@utilities/pagination";
import { EntityManager, Repository } from "typeorm";

export default class IconCategoryRepository extends Repository<IconCategoryEntity> {
  private entityManager: EntityManager;

  constructor(
    manager: EntityManager = Database.getInstance().getDataSource().manager
  ) {
    super(IconCategoryEntity, manager);
  }

  setManager(manager: EntityManager) {
    this.entityManager = manager;
  }

  async findAndPaginate(limit: number, page: number) {
    const [result, total] = await this.findAndCount({
      order: { created_at: "DESC" },
      take: limit,
      skip: PaginationUtils.calculateOffset(limit, page),
    });

    return { result, total };
  }
}

// [
//   {
//     id: "1",
//     created_at: "2024-12-01T09:37:14.000Z",
//     updated_at: "2024-12-01T09:37:14.000Z",
//     name: "Accessibility",
//     version: 1,
//   },
//   {
//     id: "2",
//     created_at: "2024-12-01T09:37:14.000Z",
//     updated_at: "2024-12-01T09:37:14.000Z",
//     name: "Alerts & Feedback",
//     version: 1,
//   },
//   {
//     id: "3",
//     created_at: "2024-12-01T09:37:14.000Z",
//     updated_at: "2024-12-01T09:37:14.000Z",
//     name: "Arrows",
//     version: 1,
//   },
// ];
