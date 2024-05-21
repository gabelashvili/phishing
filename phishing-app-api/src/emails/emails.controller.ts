import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { EmailService } from './emails.service';
import { EmailCreateDto } from './email-create.dto';
import { AuthGuard } from '@nestjs/passport';
import { EmailsQueryDto } from './email-query.dto';

@Controller('emails')
export class EmailsController {
  constructor(private emailService: EmailService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Request() req: any,
    @Body(ValidationPipe) emailCreateDto: Omit<EmailCreateDto, 'message'>,
  ) {
    const email = await this.emailService.create({
      ...emailCreateDto,
      from: req.user.email,
    });

    return { email };
  }

  @Put(':id')
  async update(@Param() { id }: { id: string }) {
    const email = await this.emailService.update(id);

    return { email };
  }
  @Get('')
  @UseGuards(AuthGuard('jwt'))
  async getAll(
    @Request() req: any,
    @Query(ValidationPipe) emailsQueryDto: EmailsQueryDto,
  ) {
    const { emails, count } = await this.emailService.getAll(
      req.user.email,
      emailsQueryDto,
    );

    return { emails, count };
  }
}
