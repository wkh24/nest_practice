import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepositiry: UserRepository,
  ) {
    super({
      secretOrKey: 'testcode',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload) {
    const { userName } = payload;
    const user: User = await this.userRepositiry.findOne({
      where: { userName },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
