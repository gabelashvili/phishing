import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailCreateDto } from './email-create.dto';
import { Email } from 'src/models/email.schema';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailsQueryDto } from './email-query.dto';

@Injectable()
export class EmailService {
  constructor(
    @InjectModel('Email') private emailModel: Model<Email>,
    private mailService: MailerService,
  ) {}

  async create(
    EmailCreateDto: Omit<EmailCreateDto, 'message'> & { from: string },
  ) {
    const html = `to check news please click <a href="${process.env.REDIRECT_URI}/news/:id">click here </a>`;
    const createdEmail = new this.emailModel({
      ...EmailCreateDto,
      message: html,
    });
    const res = await createdEmail.save();
    this.mailService.sendMail({
      from: EmailCreateDto.from,
      to: EmailCreateDto.to,
      subject: `Important news`,
      html: html.replace(':id', res.id),
    });
    return createdEmail;
  }

  async update(id: string) {
    const updatedEmail = await this.emailModel.findByIdAndUpdate(
      id,
      {
        status: 1,
      },
      { new: true },
    );
    return updatedEmail;
  }

  async getAll(from: string, emailsQueryDto: EmailsQueryDto) {
    const count = await this.emailModel
      .find({
        to: { $regex: emailsQueryDto.email },
      })
      .countDocuments();

    const emails = await this.emailModel
      .find({
        // from,
        to: { $regex: emailsQueryDto.email },
      })
      .limit(Number(emailsQueryDto.pageSize))
      .skip(Number(emailsQueryDto.pageSize) * Number(emailsQueryDto.page));
    return { emails, count };
  }
}
