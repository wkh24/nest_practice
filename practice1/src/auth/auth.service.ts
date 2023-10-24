import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  private user: User[] = [];
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  // getOne(id: number): User {
  //   console.log(id)
  //   const userId = this.userRepository.find((user) => user.id === id)
  //   if(!user) {
  //     throw new NotFoundException('dsf')
  //   }
  //   return userId
  // }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return await this.userRepository.createUser(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ message: string; token: string }> {
    const { userName, password } = authCredentialsDto;
    const user = await this.userRepository.findOne({
      where: { userName: userName },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { userName };
      const accessToken = await this.jwtService.sign(payload);

      return { message: 'LOGIN SUCCESS', token: accessToken };
    } else {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'LOGIN FAILED',
      });
    }
  }
}
