import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from './schemas/transaction.schema';

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

  async findAll() {
    const transactions = await this.TransactionModel.find();
    return transactions;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }
}
