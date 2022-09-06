import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

let counter = 1;

@Injectable()
export class TransactionService {
  constructor(@InjectQueue('transaction') private transactionQueue: Queue) {}

  async enQueueTransaction() {
    console.log('Before enqueue');

    try {
      const job = await this.transactionQueue.add(
        'check',
        {
          message: 'enqueue-transaction',
        },
        { jobId: counter, timeout: 3000 },
      );
      counter++;
      // console.log(job);
      // const result = await job.finished();
      return { state: true, job };
    } catch (err) {
      throw new Error(err);
    }
  }
}
