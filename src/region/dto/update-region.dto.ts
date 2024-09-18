import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateRegionDto {
  @ApiPropertyOptional({ description: 'Region nomi', example: 'Farg`ona' })
  @IsString({ message: 'String ko`rinishida bo`lishi kerak!' })
  @IsOptional()
  name?: string;
}
