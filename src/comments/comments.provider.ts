import { Comment } from '../models/comments.model';
import { COMMENT_REPOSITORY } from '../core/constants';

export const commentsProvider = [
  {
    provide: COMMENT_REPOSITORY,
    useValue: Comment,
  },
];
