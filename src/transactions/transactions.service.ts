import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from './schemas/transaction.schema';
import { transactionResponseDto } from './dto/transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly TransactionModel: Model<Transaction>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const transaction =
      await this.TransactionModel.create(createTransactionDto);
    return transaction;
  }

  async findAll(): Promise<transactionResponseDto[]> {
    const transactions = await this.TransactionModel.find();
    return transactions;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }
}
