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
    const [results, total] = await this.findAndCount({
      order: { created_at: "DESC" },
      take: limit,
      skip: PaginationUtils.calculateOffset(limit, page),
    });

    return { results, total };
  }
}
