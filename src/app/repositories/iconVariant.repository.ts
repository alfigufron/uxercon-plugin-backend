import Database from "@config/database";
import IconVariantEntity from "@entities/IconVariant.entity";
import { EntityManager, Repository } from "typeorm";

export default class IconVariantRepository extends Repository<IconVariantEntity> {
  private entityManager: EntityManager;

  constructor(
    manager: EntityManager = Database.getInstance().getDataSource().manager
  ) {
    super(IconVariantEntity, manager);
  }

  setManager(manager: EntityManager) {
    this.entityManager = manager;
  }
}
