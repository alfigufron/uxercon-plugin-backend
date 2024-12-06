import { Column, Entity, OneToMany } from "typeorm";
import BaseEntity from "./Base.entity";
import IconEntity from "./Icon.entity";

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

  @OneToMany(() => IconEntity, icon => icon.category)
  icons: IconEntity[];
}
