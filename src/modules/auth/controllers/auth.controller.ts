import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CredentialRequestDTO } from '../dto/credential.request.dto';
import { TokenResponseDTO } from '../dto/token-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('generate-jwt')
  async generateJWT(
    @Body() credentialRequestDTO: CredentialRequestDTO,
  ): Promise<TokenResponseDTO> {
    return this.authService.generateJWT(credentialRequestDTO);
  }
}
