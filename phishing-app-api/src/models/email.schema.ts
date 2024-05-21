import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

enum Statuses {
  Pending,
  Fulfilled,
}

export type EmailDocument = HydratedDocument<Email>;

@Schema()
export class Email {
  @Prop({ required: true })
  from: string;

  @Prop({ required: true })
  to: string;

  @Prop({ required: true })
  message: string;

  @Prop({ default: Statuses.Pending })
  status: Statuses;
}

export const EmailSchema = SchemaFactory.createForClass(Email);

EmailSchema.pre('save', async function (next) {
  try {
    this.message = this.message.replace(':id', this.id);
    return next();
  } catch (err) {
    return next(err);
  }
});
