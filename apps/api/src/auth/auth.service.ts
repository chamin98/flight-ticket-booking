import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../features/users/users.service';

@Injectable()
export class AuthService {
  readonly saltOrRounds = 10;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByUsername(username);
    if (!user?.hash) throw new NotFoundException();

    const isMatch = await bcrypt.compare(password, user.hash);

    if (!isMatch) throw new UnauthorizedException();

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(
    username: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<{ access_token: string }> {
    const hash = await bcrypt.hash(password, this.saltOrRounds);
    const user = await this.usersService.create({
      username,
      hash,
      firstName,
      lastName,
    });
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
