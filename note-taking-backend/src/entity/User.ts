import { IsEmail } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: String;

  @Column()
  name!: string;

  @Column({ unique: true })
  @IsEmail()
  email!: String;

  @Column({ unique: true })
  password!: String;
}
