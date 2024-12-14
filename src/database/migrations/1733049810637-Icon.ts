import { DEFAULT_TABLE_COLUMNS } from "@global/constant/database.constant";
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from "typeorm";

export class Icon1733049810637 implements MigrationInterface {
  private table = new Table({
    name: "icons",
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
        name: "svg",
        type: "longtext",
      },
      {
        name: "icon_variant_id",
        type: "bigint",
        unsigned: true,
      },
      {
        name: "icon_category_id",
        type: "bigint",
        unsigned: true,
      },
      ...DEFAULT_TABLE_COLUMNS,
    ],
  });

  private nameIdx = new TableIndex({
    name: "icon_name_idx",
    columnNames: ["name"],
  });

  private variantFK = new TableForeignKey({
    columnNames: ["icon_variant_id"],
    referencedTableName: "icon_variants",
    referencedColumnNames: ["id"],
    onDelete: "RESTRICT",
  });

  private categoryFK = new TableForeignKey({
    columnNames: ["icon_category_id"],
    referencedTableName: "icon_categories",
    referencedColumnNames: ["id"],
    onDelete: "RESTRICT",
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table, true);
    await queryRunner.createIndex(this.table, this.nameIdx);
    await queryRunner.createForeignKeys(this.table.name, [
      this.variantFK,
      this.categoryFK,
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(this.table.name);

    const variantFK = table?.foreignKeys.find(
      fk => fk.columnNames.indexOf("icon_variant_id") !== -1
    );
    if (variantFK) await queryRunner.dropForeignKey(this.table.name, variantFK);

    const categoryFK = table?.foreignKeys.find(
      fk => fk.columnNames.indexOf("icon_category_id") !== -1
    );
    if (categoryFK)
      await queryRunner.dropForeignKey(this.table.name, categoryFK);

    await queryRunner.dropTable(this.table, true);
  }
}
