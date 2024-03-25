import { Injectable, Inject, Logger } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from './schemas/transaction.schema';
import { transactionResponseDto } from './dto/transaction.dto';
import { PayablesService } from '../payables/payables.service';
import { GetTransactionByCardAndDateOwnerDto } from './dto/get-transactions-by-card-and-date-owner.dto';

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
      const transaction: CreateTransactionDto =
        await this.TransactionModel.create(createTransactionDto);
      await this.payablesService.create(transaction);
      return transaction;
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }

  async findAllByCardOwnerAndCardNumber(
    data: GetTransactionByCardAndDateOwnerDto,
  ): Promise<{
    available: transactionResponseDto[];
    waiting_funds: transactionResponseDto[];
  }> {
    this.logger.log(`Find All By Card Owner: ${data}`);
    const transactions = await Promise.all([
      this.TransactionModel.find({ ...data, method_payment: 'debit_card' }),
      this.TransactionModel.find({ ...data, method_payment: 'credit_card' }),
    ]);

    return {
      available: transactions[0],
      waiting_funds: transactions[1],
    };
  }
}
