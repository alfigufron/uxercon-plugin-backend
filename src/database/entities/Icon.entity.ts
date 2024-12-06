import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import BaseEntity from "./Base.entity";
import IconCategoryEntity from "./IconCategory.entity";
import IconVariantEntity from "./IconVariant.entity";

@Entity("icons")
export default class IconEntity extends BaseEntity {
  @Column({
    type: "varchar",
    length: 255,
  })
  name: string;

  @Column({
    type: "longtext",
  })
  svg: string;

  @ManyToOne(() => IconVariantEntity, variant => variant.icons)
  variant: IconVariantEntity[];

  @ManyToOne(() => IconCategoryEntity, category => category.icons)
  category: IconCategoryEntity[];
}
