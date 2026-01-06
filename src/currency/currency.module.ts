import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CurrencyService } from "./currency.service";
import { CurrencyController } from "./currency.controller";
import { Currency } from "./currency.entity";
import { AuthModule } from "src/auth/auth.module";
@Module({
  imports: [TypeOrmModule.forFeature([Currency]), AuthModule],
  providers: [CurrencyService],
  controllers: [CurrencyController],
})
export class CurrencyModule {}
