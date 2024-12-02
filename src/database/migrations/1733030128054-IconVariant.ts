import { DEFAULT_TABLE_COLUMNS } from "@constant/database.constant";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class IconVariant1733030128054 implements MigrationInterface {
  private table = new Table({
    name: "icon_variants",
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
