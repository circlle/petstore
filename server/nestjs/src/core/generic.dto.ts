import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponseDto<TData> {
  @ApiProperty()
  data: TData;

  @ApiProperty({
    example: 0,
    description: 'when success, the code field will be 0',
  })
  code: 0;

  @ApiProperty()
  message: 'success';
}

export class FailedResponseDto {
  @ApiProperty({ example: '400', description: 'http code (error)' })
  statusCode: number;

  @ApiProperty()
  data: { error: string };

  @ApiProperty()
  message: 'failed';

  @ApiProperty({
    example: 1,
    description: 'when failed, the code field will be 1',
  })
  code: 1;

  @ApiProperty()
  url: string;
}
