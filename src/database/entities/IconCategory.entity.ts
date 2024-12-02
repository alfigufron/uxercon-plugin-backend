import { Column, Entity } from "typeorm";
import BaseEntity from "./Base.entity";

@Entity("icon_categories")
export default class IconCategoryEntity extends BaseEntity {
  @Column({
    type: "varchar",
    length: 255,
    unique: true,
  })
  name: string;

  @Column({
    type: "int",
  })
  version: number;
}
