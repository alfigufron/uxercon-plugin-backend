import Database from "@config/database";
import IconCategoryEntity from "@database/entities/IconCategory.entity";
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
}
