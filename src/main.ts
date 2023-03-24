import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppExceptionsFilter } from './shared/exception/filters/app-exceptions.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);

  // Configure a global filter for exceptions
  app.useGlobalFilters(new AppExceptionsFilter(httpAdapter));

  // Configure a global prefix for the API
  app.setGlobalPrefix('v1');

  // Configure a global validator for requests
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // Enable CORS for API
  app.enableCors({
    origin: '*',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    optionsSuccessStatus: 204,
  });

  await app.listen(process.env.APP_API_PORT || 3000, () => {
    console.log(`HTTP Server running on port ${process.env.APP_API_PORT}`);
  });
}
bootstrap();
