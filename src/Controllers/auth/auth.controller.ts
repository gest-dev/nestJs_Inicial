import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import loginSchema from '@/schemas/login.schemas';
import { JoiValidationInterceptor } from '@/interceptors/joi-validation.interceptor';
import { RateLimitGuard } from '@/guards/rate-limit.guard';

@Controller('auth')
export class AuthController {
  @Post('login')
  @UseGuards(new RateLimitGuard(5))
  @UseInterceptors(new JoiValidationInterceptor(loginSchema))
  async login(@Body() body) {
    // Lógica de login
    return {
      message: 'Login realizado com sucesso',
      //user: body,
    };
  }
}
