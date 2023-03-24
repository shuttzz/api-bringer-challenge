import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../types/user.type';
import * as crypto from 'crypto';
import { CredentialRequestDTO } from '../dto/credential.request.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateJWT(data: CredentialRequestDTO) {
    // Fake user id to simulate id in database
    const userIdFake = crypto.randomUUID();

    // Validates the information and retrieves the user
    const user = await this.checkCredentials(data);

    if (!user) {
      throw new UnauthorizedException('E-mail/Password incorrect');
    }

    return {
      token: this.jwtService.sign(
        {
          email: user.email,
          id: user.id,
        },
        {
          subject: userIdFake,
        },
      ),
    };
  }

  async checkCredentials(data: User): Promise<any> {
    // Here you will search for the user in the database for example
    const userFound = { email: data.email, password: data.password };

    // Here validates user information
    const emailIsValid = userFound.email === data.email;
    const passwordIsValid = userFound.password === data.password;

    if (passwordIsValid && emailIsValid) {
      return userFound;
    }

    return null;
  }
}
