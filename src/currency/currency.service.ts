import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Currency } from "./currency.entity";
import { In } from "typeorm/browser/find-options/operator/In.js";

/**
 * @class CurrencyService
 * @description Fornece funcionalidades para conversão e listagem de moedas
 */
@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(Currency)
    private currencyRepository: Repository<Currency>
  ) {}

  async getAvailableCurrencies(): Promise<string[]> {
    const currencies = await this.currencyRepository.find();
    return currencies.map((currency) => currency.code);
  }

  async convertCurrency(
    amount: number,
    from: string,
    to: string
  ): Promise<number> {
    const fromCurrency = await this.currencyRepository.findOne({
      where: { code: from },
    });

    const toCurrency = await this.currencyRepository.findOne({
      where: { code: to },
    });

    if (!fromCurrency)
      throw new NotFoundException(`Source currency ${from} not found`);
    if (!toCurrency)
      throw new NotFoundException(`Target currency ${to} not found`);

    const convertedAmount = (amount / fromCurrency.rate) * toCurrency.rate;
    return convertedAmount;
  }

  async createCurrency(code: string, rate: number): Promise<Currency> {
    const currency = this.currencyRepository.create({ code, rate });
    await this.currencyRepository.save(currency);
    return currency;
  }

  async updateCurrentRate(code: string, rate: number): Promise<Currency> {
    const currency = await this.currencyRepository.findOneBy({ code });

    if (!currency) {
      throw new NotFoundException(`Currency with code ${code} not found`);
    }

    currency.rate = rate;

    return await this.currencyRepository.save(currency);
  }
}
