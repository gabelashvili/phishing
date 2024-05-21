import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EmailsQueryDto {
  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsNotEmpty()
  page: string;

  @IsString()
  @IsNotEmpty()
  pageSize: string;
}
