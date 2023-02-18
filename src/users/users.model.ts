import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';

  export enum RoleEnumType {
    USER = 'user',
    ADMIN = 'admin',
    DEVELOPER = 'developer'
  }
  
@Entity({ name: 'users' })
export class User  {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;
  
    @Column({ unique: true })
    username: string;
  
    @Column()
    password: string;

    @Column({default: RoleEnumType.USER})
    role: RoleEnumType;

}
