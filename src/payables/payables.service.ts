import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Payable } from './schemas/payable.schema';
import { Model } from 'mongoose';
import { transactionDto } from './dto/transaction.dto';
import { payableFromDebitTransaction } from './domain/payableDebitTransaction.domain';
import { payableFromCreditTransaction } from './domain/payableCreditTransaction.domain';

@Injectable()
export class PayablesService {
  private readonly logger = new Logger('Payable Service');

  constructor(
    @InjectModel(Payable.name)
    private readonly PayableModel: Model<Payable>,
  ) {}

  async findAll() {
    return await this.PayableModel.find();
  }

  async create(createTransactionDto: transactionDto) {
    switch (createTransactionDto.method_payment) {
      case 'debit_card':
        const payableDebitFactory = new payableFromDebitTransaction();
        const payableDebit =
          await payableDebitFactory.createDebitPayable(createTransactionDto);
        await this.PayableModel.create(payableDebit);
        break;
      case 'credit_card':
        const payableCreditFactory = new payableFromCreditTransaction();
        const payableCredit =
          await payableCreditFactory.createCreditPayable(createTransactionDto);
        await this.PayableModel.create(payableCredit);
        break;
      default:
        const error = `Method payment: ${createTransactionDto.method_payment} is not allowed`;
        this.logger.error(error);
        throw new Error(error);
    }
  }
}
