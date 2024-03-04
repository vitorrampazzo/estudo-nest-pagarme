import { Injectable, Inject, Logger } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from './schemas/transaction.schema';
import { transactionResponseDto } from './dto/transaction.dto';
import { PayablesService } from 'src/payables/payables.service';

@Injectable()
export class TransactionsService {
  private readonly logger = new Logger('Transactions Controller');

  constructor(
    @InjectModel(Transaction.name)
    private readonly TransactionModel: Model<Transaction>,
    private readonly payablesService: PayablesService,
  ) {}

  @Inject(PayablesService)
  async create(createTransactionDto: CreateTransactionDto) {
    try {
      const transaction =
        await this.TransactionModel.create(createTransactionDto);

      await this.payablesService.create(createTransactionDto);
      return transaction;
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }

  async findAll(): Promise<transactionResponseDto[]> {
    const transactions = await this.TransactionModel.find();
    return transactions;
  }
}
