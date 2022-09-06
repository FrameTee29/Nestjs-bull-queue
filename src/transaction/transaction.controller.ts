import { Controller, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('')
  enQueueTransaction() {
    console.log('Controller - enQueueTransaction');
    return this.transactionService.enQueueTransaction();
  }
}
