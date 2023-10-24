import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { CustomRepository } from "src/boards/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { User } from "./user.entity";
import * as bcrypt from "bcryptjs"

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const {userName, password } = authCredentialsDto

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = this.create({userName, password: hashedPassword })

    try{
      await this.save(user)
    } catch (error) {
      if(error.code === 'ER_DUP_ENTRY'){
        throw new ConflictException('이미 존재하는 유저입니다.')
      } else {
        throw new InternalServerErrorException
      }
    }
  }
}
