import { Module } from '@nestjs/common';
import { EmailsController } from './emails.controller';
import { EmailService } from './emails.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailSchema } from 'src/models/email.schema';

@Module({
  controllers: [EmailsController],
  providers: [EmailService],
  imports: [
    MongooseModule.forFeature([{ name: 'Email', schema: EmailSchema }]),
  ],
})
export class EmailsModule {}
