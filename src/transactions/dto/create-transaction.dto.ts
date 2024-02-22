import { ArrayContains, IsNotEmpty } from 'class-validator';
import { methodPayment } from '../schemas/transaction.schema';

export class CreateTransactionDto {
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  value: number;

  @IsNotEmpty()
  @ArrayContains(methodPayment)
  method_payment: string;

  @IsNotEmpty()
  card_number: string;

  @IsNotEmpty()
  card_owner: string;

  @IsNotEmpty()
  card_validate: string;

  @IsNotEmpty()
  card_security: string;
}
