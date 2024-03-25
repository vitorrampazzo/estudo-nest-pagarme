import { payableDto } from '../dto/payable.dto';
import { transactionDto } from '../dto/transaction.dto';

export interface IPayableTransaction {
  createPayable(transaction: transactionDto): Promise<payableDto>;
  calculatePaymentTaxes(payment: number): number;
}
