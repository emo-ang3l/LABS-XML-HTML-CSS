import { IsString, IsNotEmpty } from 'class-validator';

export class CreateStockDto {
  @IsString()
  @IsNotEmpty()
  src: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  text: string;
}