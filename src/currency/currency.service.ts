import { Injectable, NotFoundException } from "@nestjs/common";

/**
 * @class CurrencyService
 * @description Fornece funcionalidades para conversão e listagem de moedas
 */
@Injectable()
export class CurrencyService {
  /**
   * @private
   * @description Lista de moedas e suas taxas de câmbio em relação a uma moeda base
   */
  private currencies = [
    { code: "USD", rate: 1.0 },
    { code: "EUR", rate: 0.85 },
    { code: "BRL", rate: 5.25 },
  ];

  /**
   * Retorna uma lista com os códigos de todas as moedas disponíveis para conversão
   * @returns {string[]} Array de strings contendo os códigos das moedas
   */
  getAvailableCurrencies(): string[] {
    return this.currencies.map((currency) => currency.code);
  }

  /**
   * Realiza a conversão de um valor entre duas moedas com base nas taxas de câmbio internas
   *
   * @param {number} amount - O valor a ser convertido. Deve ser > 0
   * @param {string} from - O código da moeda de origem
   * @param {string} to - O código da moeda de destino
   * @returns {number} - O valor convertido para a moeda de destino
   * @throws {NotFoundException} Lança uma exceção se o código da moeda de origem ou de destino não for encontrado
   * * @example
   * // Exemplo de uso:
   * const convertedValue = currencyService.convertCurrency(100, 'BRL', 'USD');
   */
  convertCurrency(amount: number, from: string, to: string): number {
    const fromCurrency = this.currencies.find(
      (currency) => currency.code === from
    )?.rate;

    const toCurrency = this.currencies.find(
      (currency) => currency.code === to
    )?.rate;

    if (!fromCurrency || !toCurrency) {
      throw new NotFoundException(
        `Currency code not found. Please use one of the following: ${this.getAvailableCurrencies().join(", ")}`
      );
    }

    const convertedAmount = (amount / fromCurrency) * toCurrency;

    return parseFloat(convertedAmount.toFixed(2));
  }
}

// Expanda o CurrencyService: Adicione uma função ao serviço que permita
// atualizar as taxas de câmbio. Simule a atualização das taxas de câmbio com
// valores diferentes.
// 2. Adicione Mais Moedas: Expanda a lista de moedas suportadas pelo serviço
// adicionando pelo menos mais três moedas com suas respectivas taxas de
// câmbio.
// 3. Teste a Lógica de Conversão: Adicione testes no arquivo
// currency.service.spec.ts para verificar se a lógica de conversão está
// funcionando corretamente.
