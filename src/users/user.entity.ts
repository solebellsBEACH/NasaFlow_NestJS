import { Entity, PrimaryGeneratedColumn, Column, Unique, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthPayloadDto } from '@auth/dto/auth.dto';

@Entity()
@Unique('unique_username', ['username'])
export class User {

  constructor(userBody: AuthPayloadDto) {
    if (userBody) {
      this.password = userBody.password
      this.username = userBody.username
    }
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }
}
