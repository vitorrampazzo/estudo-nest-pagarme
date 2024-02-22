import { ArrayContains, IsNotEmpty, Length } from 'class-validator';
import { methodPayment } from '../schemas/transaction.schema';

export class CreateTransactionDto {
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  value: number;

  @IsNotEmpty()
  @ArrayContains(methodPayment, {
    message: 'O método de pagamento deve cartão de crédito ou cartão de débito',
  })
  method_payment: string;

  @IsNotEmpty()
  card_number: string;

  @IsNotEmpty()
  card_owner: string;

  @IsNotEmpty()
  card_validate: string;

  @IsNotEmpty()
  @Length(3, 3, {
    message: 'O CVV precisa ter exatamente 3 digitos',
  })
  card_security: string;
}
