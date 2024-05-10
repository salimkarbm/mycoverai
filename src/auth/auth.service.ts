import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { CreateUserDto } from 'src/users/dto/user.dto';
import { User } from '../models/users.model';

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(payload: CreateUserDto): Promise<User> {
    const isUser = await this.usersService.findByEmail(payload.email);
    if (isUser) {
      throw new BadRequestException('Email already in use');
    }
    //Generate a salt
    const salt = randomBytes(8).toString('hex');

    // Hash the salt and the password together
    const hash = (await scrypt(payload.password, salt, 32)) as Buffer;

    // Join the hashed result and salt together

    const result = salt + '.' + hash.toString('hex');

    // create user  andd save to datebase
    const user = await this.usersService.create({
      ...payload,
      password: result,
    });
    //return user
    return user;
  }

  async signin(email: string, password: string): Promise<User> {
    const isUser = await this.usersService.findByEmail(email);
    if (!isUser) {
      throw new BadRequestException('user not found');
    }
    const [salt, storedHash] = isUser.password.split('.');

    // Hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('invalid password');
    }
    //return user
    return isUser;
  }
}
