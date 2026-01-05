import { Body, Controller, Get, Patch, Post, Put, Query } from "@nestjs/common";
import { CurrencyService } from "./currency.service";
import { Currency } from "./currency.entity";
import { ConvertyCurrencyDto } from "./convert-currency.dto";
@Controller("currency")
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}
  @Get("convert")
  async convertCurrency(
    //Aceita três parametros
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
  async createCurrency(
    @Body("code") code: string,
    @Body("rate") rate: number
  ): Promise<Currency> {
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
