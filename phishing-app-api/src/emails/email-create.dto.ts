import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EmailCreateDto {
  @IsEmail()
  to: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  // @IsEnum([0, 1])
  // status: number;
}
