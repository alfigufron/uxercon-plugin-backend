import Database from "@config/database";
import IconEntity from "@entities/Icon.entity";
import PaginationUtils from "@utilities/pagination";
import { EntityManager, Repository } from "typeorm";

export default class IconRepository extends Repository<IconEntity> {
  private entityManager: EntityManager;

  constructor(
    manager: EntityManager = Database.getInstance().getDataSource().manager
  ) {
    super(IconEntity, manager);
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
