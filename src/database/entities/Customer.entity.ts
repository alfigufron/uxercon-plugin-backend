import { Column, Entity } from "typeorm";
import BaseEntity from "./Base.entity";

@Entity("customers")
export default class CustomerEntity extends BaseEntity {
  @Column({
    type: "varchar",
    length: 255,
  })
  name: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  email: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  license_key: string;
}
