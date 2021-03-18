import { ApiProperty } from '@nestjs/swagger';

export class UserData {
  @ApiProperty({ example: 'user1', description: 'Name of the user' })
  username: string;

  @ApiProperty({ example: 'user@gmail.com', description: 'Email of the user' })
  email: string;

  @ApiProperty({
    example: '12345678901',
    description: 'Phone number of the user',
  })
  phone: string;

  @ApiProperty({
    example: 'http://xxx.xxx.jpeg',
    description: 'Avatar of the user',
  })
  avatar: string;
}

export class LoginResult {
  @ApiProperty()
  token: string;
}

export class JWTInfo {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  exp: number;
}
