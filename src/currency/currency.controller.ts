import { Controller, Get, Query } from "@nestjs/common";
import { CurrencyService } from "./currency.service";
@Controller("currency")
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}
  @Get("convert")
  convertCurrency(
    @Query("amount") amount: number,
    @Query("from") from: string,
    @Query("to") to: string
  ): { convertedAmount: number } {
    const convertedAmount = this.currencyService.convertCurrency(
      amount,
      from,
      to
    );
    return { convertedAmount };
  }
  @Get("list")
  getAvailableCurrencies(): string[] {
    return this.currencyService.getAvailableCurrencies();
  }
}
