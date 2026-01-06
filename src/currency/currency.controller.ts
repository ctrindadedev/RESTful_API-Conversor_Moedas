import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { CurrencyService } from "./currency.service";
import { Currency } from "./currency.entity";
import { ConvertyCurrencyDto } from "./dtos/convert-currency.dto";
import { CreateCurrencyDto } from "./dtos/create-currency.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ApiOperation, ApiQuery } from "@nestjs/swagger";
@UseGuards(JwtAuthGuard)
@Controller("currency")
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @ApiOperation({ summary: "Converte uma moeda para outra" })
  @ApiQuery({ name: "from", description: "Moeda de origem", example: "USD" })
  @ApiQuery({ name: "to", description: "Moeda de destino", example: "BRL" })
  @ApiQuery({
    name: "amount",
    description: "Valor a ser convertido",
    example: 100,
  })
  @Get("convert")
  async convertCurrency(
    @Query() query: ConvertyCurrencyDto
  ): Promise<{ convertedAmount: number }> {
    const { amount, from, to } = query;
    const convertedAmount = await this.currencyService.convertCurrency(
      amount,
      from,
      to
    );
    return { convertedAmount };
  }
  @Get("list")
  async getAvailableCurrencies(): Promise<string[]> {
    return await this.currencyService.getAvailableCurrencies();
  }

  @Post()
  async createCurrency(@Query() query: CreateCurrencyDto): Promise<Currency> {
    const { code, rate } = query;
    return await this.currencyService.createCurrency(code, rate);
  }

  @Patch()
  async updateUpdateCurencyRate(
    @Body("code") code: string,
    @Body("rate") rate: number
  ): Promise<Currency> {
    return await this.currencyService.updateCurrentRate(code, rate);
  }
}
