export class payableDto {
  transaction_id: string;
  status: 'paid' | 'waiting_funds';
  payment_date: string;
  payment: number;
  payment_with_taxes: number;
}
