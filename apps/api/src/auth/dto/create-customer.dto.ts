import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({
    example: 'Ahmed Mohamed',
  })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    example: '01012345678',
  })
  @IsPhoneNumber('EG')
  phone: string;

  @ApiProperty({
    example: 'ahmed@gmail.com',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;
}