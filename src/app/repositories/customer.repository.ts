import Database from "@config/database";
import CustomerEntity from "@entities/Customer.entity";
import { EntityManager, Repository } from "typeorm";

export default class CustomerRepository extends Repository<CustomerEntity> {
  private entityManager: EntityManager;

  constructor(
    manager: EntityManager = Database.getInstance().getDataSource().manager
  ) {
    super(CustomerEntity, manager);
  }

  setManager(manager: EntityManager) {
    this.entityManager = manager;
  }
}
