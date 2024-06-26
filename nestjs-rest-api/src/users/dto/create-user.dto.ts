import { IsNotEmpty, IsString, IsEmail, IsEnum } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['INTERN', 'ENGINEER', 'ADMIN'], {
    message: 'Role must be either INTERN, ENGINEER, or ADMIN',
  })
  role: 'INTERN' | 'ENGINEER' | 'ADMIN';
}
