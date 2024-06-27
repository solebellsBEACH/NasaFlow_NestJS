import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Unique('unique_username', ['username'])
    username: string;

    @Column()
    @Unique('unique_password', ['password'])
    password: string;
}
