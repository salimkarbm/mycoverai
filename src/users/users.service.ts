import { Inject, Injectable } from '@nestjs/common';
import { User } from '../models/users.model';
import { USER_REPOSITORY } from 'src/core/constants';
import { Op } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async create(payload: Partial<User>): Promise<User> {
    const user = await this.userRepository.create(payload);
    await user.save();
    return user.dataValues;
  }

  async findOne(id: number): Promise<User | null> {
    return await this.userRepository.findByPk(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email: { [Op.like]: `%${email}%` } },
    });
  }
}
