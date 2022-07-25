import { IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  readonly email: string;
  readonly username: string;
  readonly password: string;
  readonly image: string;
  readonly bio: string;
}
