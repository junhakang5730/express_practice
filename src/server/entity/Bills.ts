import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  ManyToOne,
} from "typeorm";

import { Users } from "./Users";
import { v4 as uuid } from "uuid";

@Entity()
export class Bills extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  round_id: string;

  @Column()
  status: string;

  @Column()
  shipping_type: string;

  @Column()
  total_weight: number;

  @Column()
  cargo_fee: number;

  @Column()
  domestic_fee: number;

  @Column()
  update_pics: number;

  @ManyToOne(() => Users)
  user: Users;

  @Column({ type: "uuid" })
  uuid: string;

  @CreateDateColumn()
  join_date: Date;

  @UpdateDateColumn()
  update_date: Date;

  @BeforeInsert()
  createUuid() {
    this.uuid = uuid();
  }

  toJSON() {
    return { ...this, id: undefined };
  }
}
