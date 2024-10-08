// create-district.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class UpdateDistrictDto {
  @ApiPropertyOptional({ description: 'Tuman nomi' })
  @IsString({ message: 'Nom matn ko‘rinishida bo‘lishi kerak!' })
  @IsNotEmpty({ message: 'Nom bo‘sh bo‘lmasligi kerak!' })
  name: string;

  @ApiPropertyOptional({
    description: 'Tuman tegishli bo‘lgan hududning ID raqami',
  })
  @IsInt({ message: 'Hudud ID butun son bo‘lishi kerak!' })
  @IsNotEmpty({ message: 'Hudud ID bo‘sh bo‘lmasligi kerak!' })
  regionId: number;
}
