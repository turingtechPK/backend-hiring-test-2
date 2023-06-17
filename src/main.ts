import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * This function creates and starts a NestJS application on port 3000.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
