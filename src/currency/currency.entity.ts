import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Currency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column("decimal", { precision: 5, scale: 2 })
  rate: number;
}
