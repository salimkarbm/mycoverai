import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EMAIL_CREDENTIALS } from 'src/core/constants';
import { convert } from 'html-to-text';

@Injectable()
export class EmailService {
  async sendMail(options: any, template: any): Promise<any> {
    // convert email in HTML to plain text
    const text = await this.convertEmailToText(template);
    const msg: any = {
      to: options.email,
      from: options.from || EMAIL_CREDENTIALS.EMAIL_FROM, // Use the email address or domain you verified
      subject: options.subject,
      html: template,
      text,
    };

    try {
      if (process.env.NODE_ENV === 'production') {
        const transporter = nodemailer.createTransport({
          host: EMAIL_CREDENTIALS.MAIL_HOST,
          port: EMAIL_CREDENTIALS.MAIL_PORT,
          auth: {
            user: EMAIL_CREDENTIALS.MAIL_USERNAME,
            pass: EMAIL_CREDENTIALS.MAIL_PASSWORD,
          },
        });
        // send the email with nodemailer
        try {
          const result = await transporter.sendMail(msg);
          return result;
        } catch (error: any) {
          console.log(error);
          if (error.response) {
            console.error(error.response.body);
          }
        }
      }
      const transporter = nodemailer.createTransport({
        host: EMAIL_CREDENTIALS.MAIL_HOST,
        port: EMAIL_CREDENTIALS.MAIL_PORT,
        secure: true,
        auth: {
          user: EMAIL_CREDENTIALS.MAIL_USERNAME,
          pass: EMAIL_CREDENTIALS.MAIL_PASSWORD,
        },
      });
      // send the email with nodemailer
      const result = await transporter.sendMail(msg);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  private convertEmailToText = async (html: string) => {
    const result = convert(html, {
      wordwrap: 150,
    });
    return result;
  };

  // New Post Email Notification
  async sendNewPostEmail(options: any) {
    const message = `<section style="font-family: sans-serif; margin: 0; padding: 20px;">
    <h1 style="margin: 10px 0;">Hi [Subscriber Name],</h1>
    <p>We're excited to announce a new blog post on <a href="https://mycover.ai" style="color: #333; text-decoration: none;">MyCoverAI</a>! We hope you'll enjoy reading it.</p>
    <h2 style="margin: 10px 0;">${options.post.title}</h2>
    <p>[Short excerpt from the blog post to pique interest]</p>
    <p><a href="[Link to the blog post]" style="color: #333; text-decoration: none;">Read the full post here</a></p>
    <p>Don't miss out on future updates!</p>
    <p>Stay up-to-date with our latest content by subscribing to our blog. You can unsubscribe at any time.</p>
    <p><a href="[Link to subscribe/unsubscribe page]" style="color: #333; text-decoration: none;">Subscribe/Unsubscribe</a></p>
    <p>Thanks,</p>
    <p>The MyCoverAI Team</p>
  </section>`;
    const result = await this.sendMail(options, message);
    return result;
  }
}
