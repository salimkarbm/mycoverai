import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Subscriber } from '../models/subscriber.model';
import { Post } from '../models/posts.model';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { EmailService } from './email.service';

@Processor('notification-queue')
@Injectable()
export class NotificationProcessor {
  constructor(
    @Inject(EmailService) private readonly emailService: EmailService,
  ) {}

  @Process('new-post-notification')
  async handleNewPostNotification(
    job: Job<{ postId: number; subscribers: Subscriber[] }>,
  ) {
    const { postId, subscribers } = job.data;
    try {
      // Check if the post exists
      const post = await Post.findByPk(postId);
      if (!post) {
        throw new HttpException(
          `Post with ID ${postId} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      for (const subscriber of subscribers) {
        try {
          await this.sendNotification(subscriber, post);
        } catch (error) {
          console.error(
            `Error sending notification to ${subscriber.email}: ${error.message}`,
          );
          // Implement retry logic with a delay and maximum retry count
          await this.retrySendNotification(subscriber, post);
        }
      }
    } catch (error) {
      // Handle errors gracefully
      console.log(
        `Error sending notifications for post ${postId}: ${error.message}`,
      );
    }
  }

  private async sendNotification(
    subscriber: Subscriber,
    post: Post,
  ): Promise<void> {
    // Send email notification to subscriber
    const sendMail = await this.emailService.sendNewPostEmail({
      post,
      subscriber,
    });
    if (
      sendMail.accepted[0] !== subscriber.email ||
      sendMail.rejected[0] === subscriber.email
    ) {
      throw new HttpException(
        'Email not sent to subscriber',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async retrySendNotification(
    subscriber: Subscriber,
    post: Post,
    retryCount = 3,
  ) {
    let retries = 0;
    while (retries < retryCount) {
      try {
        await this.sendNotification(subscriber, post);
        break; // Exit loop if successful
      } catch (error) {
        console.error(`Retry ${retries + 1} failed: ${error.message}`);
        retries++;
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Delay before retry
      }
    }
  }
}
