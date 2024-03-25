import { payableDto } from '../dto/payable.dto';
import { transactionDto } from '../dto/transaction.dto';

export class payableFromCreditTransaction {
  async createPayable(transaction: transactionDto): Promise<payableDto> {
    const payment_with_taxes = this.calculatePaymentTaxes(transaction.value);
    const date = new Date();

    return {
      transaction_id: transaction._id,
      status: 'waiting_funds',
      payment_date: date.setDate(date.getDate() + 30).toString(),
      payment: transaction.value,
      payment_with_taxes: payment_with_taxes,
    };
  }

  private calculatePaymentTaxes(payment: number): number {
    return payment * 0.95;
  }
}
