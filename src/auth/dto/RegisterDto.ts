import { IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  id!: string;

  @IsString()
  username!: string;

  @IsString()
  email!: string;

  @IsString()
  password!: string;

  @IsString()
  character!: string;
}
