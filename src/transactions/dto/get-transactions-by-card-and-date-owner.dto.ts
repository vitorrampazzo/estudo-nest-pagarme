import { IsNotEmpty } from 'class-validator';
export class GetTransactionByCardAndDateOwnerDto {
  @IsNotEmpty()
  card_number: string;

  @IsNotEmpty()
  card_owner: string;
}
