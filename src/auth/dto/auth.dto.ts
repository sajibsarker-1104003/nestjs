import {
  IsNotEmpty,
  IsString,
  IsEmail,
  Length,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20, { message: ' Password has to be atleast 3 to 20 character' })
  public password: string;
}
