import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { SubscriberDto } from './dto/subscriber.dto';

@Controller('subscribers')
export class SubscribersController {
  constructor(private readonly subscriberService: SubscribersService) {}
  @Post()
  @HttpCode(HttpStatus.OK)
  async addSubscriber(@Body() subscriberData: SubscriberDto) {
    const subscriber =
      await this.subscriberService.addSubscriber(subscriberData);
    if (subscriber) {
      return subscriber;
    }
    throw new HttpException(
      'Unable to Add Subscriber. Please try again later!',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
