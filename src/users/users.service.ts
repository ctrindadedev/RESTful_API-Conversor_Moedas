import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}
  async createUser(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.usersRepository.create({
      username,
      password: hashedPassword,
    });
    return this.usersRepository.save(newUser);
  }
  async findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username } });
  }
  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.findByUsername(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      return user;
    }
    return null;
  }
}
