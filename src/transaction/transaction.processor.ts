import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

type checkEnqueueTransactionMessage = {
  message: string;
};

@Processor('transaction')
export class TransactionConsumer {
  @Process({ name: 'check' })
  async checkEnqueueTransaction(job: Job<checkEnqueueTransactionMessage>) {
    const { message } = job.data;

    console.log(
      `[Transaction-Processor] - (checkEnqueueTransaction) by jobId ${job.id} => `,
      message,
    );
  }
}
