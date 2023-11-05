import { IsString, IsBoolean, IsEmail, IsDate, IsInt } from 'class-validator';

export class CreateClientDto {
  @IsString()
  key_client: string;

  @IsString()
  name: string;

  @IsString()
  phone_number: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  address: string;

  @IsBoolean()
  isActive: boolean;

  @IsInt()
  createdAt: number;

  @IsInt()
  updatedAt: number;
}
