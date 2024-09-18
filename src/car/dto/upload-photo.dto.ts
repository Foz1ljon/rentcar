import { ApiProperty } from '@nestjs/swagger';

export class photoUpload {
  @ApiProperty({
    description: 'Mashina rasmi',
    type: 'string',
    format: 'binary',
  })
  photo?: any;
}
