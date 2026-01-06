import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle("API de Conversão de Moedas")
    .setDescription("Documentação da API de Conversão de Moedas")
    .setVersion("1.0")
    .addTag("Conversão")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

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
