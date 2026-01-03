import { Test, TestingModule } from "@nestjs/testing";
import { CurrencyService } from "./currency.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Currency } from "./currency.entity";
import { Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";

describe("CurrencyService", () => {
  let service: CurrencyService;
  let repository: Repository<Currency>;

  // Simula o repository do TypeORM
  const mockCurrencyRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CurrencyService,
        {
          provide: getRepositoryToken(Currency),
          useValue: mockCurrencyRepository,
        },
      ],
    }).compile();
    service = module.get<CurrencyService>(CurrencyService);
    repository = module.get<Repository<Currency>>(getRepositoryToken(Currency));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("getAvailableCurrencies", () => {
    it("should return an array of currency codes", async () => {
      const mockCurrencies = [
        { code: "USD", rate: 1 },
        { code: "BRL", rate: 5.4 },
      ];

      jest.spyOn(repository, "find").mockResolvedValue(mockCurrencies as any);

      const result = await service.getAvailableCurrencies();

      expect(result).toEqual(["USD", "BRL"]);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe("updateCurrentRate", () => {
    it("should update and return the currency if it exists", async () => {
      const mockCurrency = { code: "USD", rate: 5.0 };

      jest
        .spyOn(repository, "findOneBy")
        .mockResolvedValue(mockCurrency as any);
      jest
        .spyOn(repository, "save")
        .mockResolvedValue({ ...mockCurrency, rate: 5.5 } as any);

      const result = await service.updateCurrentRate("USD", 5.5);

      expect(result.rate).toEqual(5.5);
      expect(repository.save).toHaveBeenCalled();
    });

    it("should throw NotFoundException if currency does not exist", async () => {
      jest.spyOn(repository, "findOneBy").mockResolvedValue(null);
      await expect(service.updateCurrentRate("INVALID", 5.5)).rejects.toThrow(
        NotFoundException
      );
    });
  });

  describe("convertCurrency", () => {
    it("should convert correctly between two currencies", async () => {
      const fromCurrency = { code: "USD", rate: 1.0 };
      const toCurrency = { code: "BRL", rate: 5.0 };

      jest
        .spyOn(repository, "findOne")
        .mockResolvedValueOnce(fromCurrency as any)
        .mockResolvedValueOnce(toCurrency as any);

      const result = await service.convertCurrency(10, "USD", "BRL");

      expect(result).toBe(50);
    });
  });
});
