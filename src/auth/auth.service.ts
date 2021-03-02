import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private users = [
    {
      id: 1,
      email: 'test1@test.com',
      password: 'changeme',
    },
    {
      id: 2,
      email: 'test2@test.com',
      password: 'imbad',
    },
    {
      id: 3,
      email: 'test3@test.com',
      password: 'wowthissucks',
    },
  ];
  constructor(private readonly jwt: JwtService) {}

  login(email: string, password: string) {
    if (!email || !password) {
      throw new BadRequestException();
    }
    const user = this.users.find(
      (u) => u.email === email && u.password === password,
    );
    if (!user) {
      throw new UnauthorizedException('No user found');
    }
    return this.jwt.sign({ id: user.id, email: user.email });
  }

  getUserByPayload(payload: Record<string, any>) {
    const { password, ...user } = this.users.find((u) => {
      return payload.id === u.id && payload.email === u.email;
    });
    return user;
  }
}
