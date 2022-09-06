import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Queue from 'bull';

import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath('/bull-board');
  createBullBoard({
    queues: [new BullAdapter(new Queue('transaction'))],
    serverAdapter,
  });
  app.use('/bull-board', serverAdapter.getRouter());
  await app.listen(3333);
}
bootstrap();
