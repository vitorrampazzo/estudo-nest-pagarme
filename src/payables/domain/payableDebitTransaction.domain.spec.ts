import { transactionDto } from '../dto/transaction.dto';
import { payableFromDebitTransaction } from './payableDebitTransaction.domain';

describe('payableFromDebitTransaction', () => {
  let service: payableFromDebitTransaction;

  beforeEach(() => {
    service = new payableFromDebitTransaction();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a payable DTO of Debit Transaction', async () => {
    const transaction: transactionDto = {
      value: 100,
      description: 'Payment',
      method_payment: 'debit',
      card_number: '1234567890',
      card_owner: 'John Doe',
      card_validate: '2028-12-10',
      card_security: '132',
    };

    const result = await service.createPayable(transaction);

    expect(result).toBeDefined();
    expect(result.status).toBe('paid');
    expect(result.payment).toBe(transaction.value);
    expect(result.payment_with_taxes).toBe(97);
  });

  it('should calculate payment taxes correctly', () => {
    const payment = 100;
    const result = (service as any).calculatePaymentTaxes(payment);

    expect(result).toBe(97);
  });
});
