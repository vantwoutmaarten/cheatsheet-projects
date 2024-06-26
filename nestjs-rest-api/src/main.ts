import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const corsOptions = {
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  allowedOrigins: 'http://localhost:3000',
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors(corsOptions);
  console.log(`The connection URL is ${process.env.DATABASE_URL}`);
  await app.listen(3000);
}
bootstrap();
