import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CredentialRequestDTO {
  @IsEmail({}, { message: 'Email should be valid' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
