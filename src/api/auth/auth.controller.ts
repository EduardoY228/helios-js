import {
  Body,
  Controller,
  Inject,
  Logger,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LoginDto } from '@/api/auth/auth.dto';
import { AuthService } from '@/api/auth/auth.service';
import { LocalAuthGuard } from '@/api/auth/local-auth.guard';

@Controller('/api/v1/auth')
export class AuthController {
  @Inject(AuthService)
  private readonly authService: AuthService;

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
