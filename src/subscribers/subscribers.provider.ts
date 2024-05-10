import { SUBSCRIBER_REPOSITORY } from '../core/constants';
import { Subscriber } from 'src/models/subscriber.model';

export const subscribersProvider = [
  {
    provide: SUBSCRIBER_REPOSITORY,
    useValue: Subscriber,
  },
];
