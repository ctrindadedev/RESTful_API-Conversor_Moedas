import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Remove propriedades não declaradas no DTO
      forbidNonWhitelisted: true, // Lança erro se propriedades não declaradas forem encontradas
      transform: true, // Transforma os payloads para os tipos especificados nos DTOs
    })
  );
  app.useGlobalFilters;
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
