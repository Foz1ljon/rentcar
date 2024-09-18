// create-district.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateDistrictDto {
  @ApiProperty({ description: 'Tuman nomi', example: 'Quva', required: true })
  @IsString({ message: 'String ko`rinishida bo`lishi kerak!' })
  @IsNotEmpty({ message: 'Bo`sh bo`lmasligi kerak!' })
  name: string;

  @ApiProperty({ description: 'Tuman tegishli bo`lgan region id' })
  @IsInt({ message: 'Region id raqam bo`lishi kerak!' })
  @IsNotEmpty({ message: 'Bo`sh bo`lmasligi kerak!' })
  region: number;
}
