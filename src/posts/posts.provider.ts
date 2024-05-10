import { Post } from '../models/posts.model';
import { POST_REPOSITORY } from '../core/constants';

export const postsProvider = [
  {
    provide: POST_REPOSITORY,
    useValue: Post,
  },
];
