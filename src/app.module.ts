import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CurrencyModule } from "./currency/currency.module";

@Module({
  // módulo raiz deve incluir todas as funcionalidades definidas no CurrencyModule
  imports: [CurrencyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
