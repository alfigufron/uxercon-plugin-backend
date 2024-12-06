import { Column, Entity, JoinColumn, OneToMany } from "typeorm";
import BaseEntity from "./Base.entity";
import IconEntity from "./Icon.entity";

@Entity("icon_variants")
export default class IconVariantEntity extends BaseEntity {
  @Column({
    type: "varchar",
    length: 255,
    unique: true,
  })
  name: string;

  @OneToMany(() => IconEntity, icon => icon.variant)
  icons: IconEntity[];
}
