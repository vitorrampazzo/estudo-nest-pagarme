export class payableDto {
  status: 'paid' | 'waiting_funds';
  payment_date: string;
  payment: number;
  payment_with_taxes: number;
}
