import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SUBSCRIBER_REPOSITORY, USER_REPOSITORY } from 'src/core/constants';
import { Subscriber } from 'src/models/subscriber.model';
import { SubscriberDto } from './dto/subscriber.dto';
import { User } from 'src/models/users.model';

@Injectable()
export class SubscribersService {
  constructor(
    @Inject(SUBSCRIBER_REPOSITORY)
    private readonly subscriberRepository: typeof Subscriber,
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async addSubscriber(subscriberData: SubscriberDto): Promise<Subscriber> {
    const user = await this.userRepository.findByPk(subscriberData.userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const subscriber = await this.subscriberRepository.create({
      ...subscriberData,
      subscribedAt: new Date(),
    });
    return await subscriber.save();
  }

  async getSubscribers(): Promise<Subscriber[]> {
    return await this.subscriberRepository.findAll();
  }
}
