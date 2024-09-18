import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRegionDto {
  @ApiProperty({
    description: 'Region nomi',
    example: 'Namangan',
    required: true,
  })
  @IsString({ message: 'String ko`rinishida bo`lishi kerak!' })
  @IsNotEmpty({ message: 'Bo`sh bo`lmasligi kerak!' })
  name: string;
}
