import { IsNumber, IsString, IsNotEmpty, Min, Length } from "class-validator";

export class ConvertyCurrencyDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  amount: number;

  @IsString()
  @IsNotEmpty()
  @Length(3, 3)
  from: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 3)
  to: string;
}
