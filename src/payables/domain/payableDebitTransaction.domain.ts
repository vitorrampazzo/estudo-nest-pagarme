import { payableDto } from '../dto/payable.dto';
import { transactionDto } from '../dto/transaction.dto';

export class payableFromDebitTransaction {
  async createPayable(transaction: transactionDto): Promise<payableDto> {
    const payment_with_taxes = this.calculatePaymentTaxes(transaction.value);

    return {
      transaction_id: transaction._id,
      status: 'paid',
      payment_date: new Date().toString(),
      payment: transaction.value,
      payment_with_taxes: payment_with_taxes,
    };
  }

  private calculatePaymentTaxes(payment: number): number {
    return payment * 0.97;
  }
}
