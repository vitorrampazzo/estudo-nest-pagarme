import { IsNotEmpty, Length } from 'class-validator';
import { Transform } from 'class-transformer';
export class CreateTransactionDto {
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  value: number;

  @IsNotEmpty()
  method_payment: string;

  @IsNotEmpty()
  @Transform(({ value }) => value.slice(-4))
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
