import { DEFAULT_TABLE_COLUMNS } from "@global/constant/database.constant";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Customer1736011644397 implements MigrationInterface {
  private table = new Table({
    name: "customers",
    columns: [
      {
        name: "id",
        type: "bigint",
        isPrimary: true,
        unsigned: true,
        isGenerated: true,
        generationStrategy: "increment",
      },
      {
        name: "name",
        type: "varchar",
        length: "255",
      },
      {
        name: "email",
        type: "varchar",
        length: "255",
      },
      {
        name: "license_key",
        type: "varchar",
        length: "255",
        isNullable: true,
      },
      ...DEFAULT_TABLE_COLUMNS,
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table, true);
  }
}
