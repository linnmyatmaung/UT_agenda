import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("agendas")
export class AgendaData extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  time: string;

  @Column()
  title: string;

  @Column()
  name: string;

  @Column()
  info: string;

  @Column({ default: false })
  current: boolean;
}
