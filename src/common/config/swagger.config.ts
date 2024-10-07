import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('ESports Arena API')
  .setDescription('API restful in NestJs for ESports Arena')
  .setVersion('1.0')
  //   .addBearerAuth(
  //     {
  //       type: 'http',
  //       scheme: 'bearer',
  //       bearerFormat: 'JWT',
  //     },
  //     'access-token',
  //   )
  .build();
