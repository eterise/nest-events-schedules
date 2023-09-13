import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Email cannot be empty!' })
  @IsString({ message: 'Email must to be a string!' })
  @IsEmail()
  email: string;
  @IsNotEmpty({ message: 'Password cannot be empty!' })
  @IsString({ message: 'Password must to be a string!' })
  password: string;
}
