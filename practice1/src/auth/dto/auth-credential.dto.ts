import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4,{
    message: '4자이상 10자이하로 입력해주세요'
  })
  @MaxLength(10, {
    message: '4자이상 10자이하로 입력해주세요'
  })
  userName: string

  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]/,{
    message: '문자, 숫자, 특수문자가 반드시 포함되어야 하며 8자이상이어야 합니다.'
  })
  password: string
}