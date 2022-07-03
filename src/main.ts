import { HttpException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';




function traverseError(errors) {
  const errorStrArr = [];
  errors.forEach((err) => {
    if (err.children && err.children.length) {
      const arr = traverseError(err.children);
      arr.forEach((element) => {
        errorStrArr.push(element);
      });
    } else {
      const strArr2 = Object.keys(err.constraints).map(
        (constraint) => err.constraints[constraint],
      );
      strArr2.forEach((element) => {
        errorStrArr.push(element);
      });
    }
  });
  return errorStrArr;
}
async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: false,
      exceptionFactory: (errors) => {
        const errorStrArr = traverseError(errors);
        return new HttpException(errorStrArr.join(', '), 400);
      },
    }),
  );
  const config = new DocumentBuilder()
  .setTitle('BA - Banking App')
  .setDescription('Banking app microservice api')
  .setVersion('1.0')
  .addTag('BA')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('BankingApp/api', app, document, {
    swaggerOptions: { persistAuthorization: true },
    customSiteTitle: 'Banking API Swagger Documentation | Banking Test-2',
  });
  const port = process.env.PORT || 3001;
  app.enableCors();
  await app.listen(port, () => {
  });
}
bootstrap();