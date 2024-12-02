import { Column, Entity } from "typeorm";
import BaseEntity from "./Base.entity";

@Entity("icon_variants")
export default class IconVariantEntity extends BaseEntity {
  @Column({
    type: "varchar",
    length: 255,
    unique: true,
  })
  name: string;
}
