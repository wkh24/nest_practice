import { IsNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { AuthCredentialsDto } from './auth-credential.dto';

export class UpdateUserDto extends PartialType(AuthCredentialsDto) {}
