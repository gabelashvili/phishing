import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RegisterDTO } from 'src/user/register.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('/ping')
  @UseGuards(AuthGuard('jwt'))
  async hiddenInformation(@Request() req: any) {
    const token = await this.authService.signPayload({ email: req.user.email });
    return { user: req.user, token };
  }

  @Post('register')
  async register(@Body(ValidationPipe) registerDTO: RegisterDTO) {
    const { email, _id } = await this.userService.create(registerDTO);
    const payload = {
      email: email,
    };

    const token = await this.authService.signPayload(payload);
    return { user: { email, _id }, token };
  }
  @Post('login')
  async login(@Body(ValidationPipe) loginDTO: LoginDTO) {
    const user = await this.userService.signIn(loginDTO);
    const payload = {
      email: user.email,
      _id: user._id,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }
}
