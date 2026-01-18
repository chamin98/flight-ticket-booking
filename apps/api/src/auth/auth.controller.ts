import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Public } from './auth.constants';
import type { SignInDto, SignUpDto } from './auth.dto';
import { UsersService } from 'src/features/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(
      signUpDto.username,
      signUpDto.password,
      signUpDto.firstName,
      signUpDto.lastName,
    );
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('profile')
  getProfile(@Request() req) {
    return this.usersService.findOne(req.user.sub);
  }
}
