import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { CurrencyService } from "./currency.service";
import { Currency } from "./currency.entity";
@Controller("currency")
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}
  @Get("convert")
  async convertCurrency(
    //Aceita três parametros
    @Query("amount") amount: number,
    @Query("from") from: string,
    @Query("to") to: string
  ): Promise<{ convertedAmount: number }> {
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
}
