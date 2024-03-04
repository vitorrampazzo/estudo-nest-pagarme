import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TransactionDocument = HydratedDocument<Transaction>;

export const methodPayment = ['debit_card', 'credit_card'];

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  value: number;

  @Prop({ type: String, enum: methodPayment })
  method_payment: string;

  @Prop({ required: true })
  card_number: string;

  @Prop({ required: true })
  card_owner: string;

  @Prop({ required: true })
  card_validate: string;

  @Prop({ required: true })
  card_security: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
