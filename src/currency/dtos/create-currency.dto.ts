import { IsNumber, IsString, IsNotEmpty, Min, Length } from "class-validator";

export class CreateCurrencyDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 3)
  code: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0.01)
  @Length(1, 5)
  rate: number;
}
