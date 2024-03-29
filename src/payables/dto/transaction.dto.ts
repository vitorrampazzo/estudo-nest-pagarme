export type transactionDto = {
  description: string;
  value: number;
  method_payment: string;
  card_number: string;
  card_owner: string;
  card_validate: string;
  card_security: string;
  _id?: string;
};
