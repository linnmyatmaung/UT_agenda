// src/entities/ButtonState.ts
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("buttons")
export class ButtonState extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  state: "on" | "off"; // Store the state of the button
}
