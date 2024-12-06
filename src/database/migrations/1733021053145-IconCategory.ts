import { DEFAULT_TABLE_COLUMNS } from "src/global/constant/database.constant";
import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class IconCategory1733021053145 implements MigrationInterface {
  private table = new Table({
    name: "icon_categories",
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
        name: "version",
        type: "int",
      },
      ...DEFAULT_TABLE_COLUMNS,
    ],
  });

  private nameIdx = new TableIndex({
    name: "icon_category_name_idx",
    columnNames: ["name"],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table, true);
    await queryRunner.createIndex(this.table, this.nameIdx);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table, true);
  }
}
