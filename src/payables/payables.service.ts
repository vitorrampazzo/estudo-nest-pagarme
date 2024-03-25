import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Payable } from './schemas/payable.schema';
import { Model } from 'mongoose';
import { payableFromDebitTransaction } from './domain/payableDebitTransaction.domain';
import { payableFromCreditTransaction } from './domain/payableCreditTransaction.domain';
import { IPayableTransaction } from './domain/IpayableTransaction.interface';
import { CreateTransactionDto } from 'src/transactions/dto/create-transaction.dto';

@Injectable()
export class PayablesService {
  private readonly logger = new Logger('Payable Service');

  constructor(
    @InjectModel(Payable.name)
    private readonly PayableModel: Model<Payable>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    try {
      const payableFactories = {
        debit_card: payableFromDebitTransaction,
        credit_card: payableFromCreditTransaction,
      };

      if (!payableFactories[createTransactionDto.method_payment]) {
        const error = `Method payment: ${createTransactionDto.method_payment} is not allowed`;
        this.logger.error(error);
        return error;
      }

      const factory: IPayableTransaction = new payableFactories[
        createTransactionDto.method_payment
      ]();

      const payable = await factory.createPayable(createTransactionDto);
      await this.PayableModel.create(payable);
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }
}
