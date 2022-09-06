import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TransactionConsumer } from './transaction.processor';

@Module({
  imports: [
    BullModule.registerQueueAsync({
      name: 'transaction',
      useFactory: async () => ({
        redis: {
          host: 'redis-13498.c1.ap-southeast-1-1.ec2.cloud.redislabs.com',
          port: 13498,
          username: 'default',
          password: 'LIbzCuTvquqO3hy9PT9Ler6MA7wHBpPt',
        },
      }),
    }),
  ],
  providers: [TransactionService, TransactionConsumer],
  controllers: [TransactionController],
})
export class TransactionModule {}
