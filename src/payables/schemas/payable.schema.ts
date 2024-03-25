import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Transaction } from '../../transactions/schemas/transaction.schema';

export type PayableDocument = HydratedDocument<Payable>;

@Schema({ timestamps: true })
export class Payable {
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: Transaction.name })
  transaction_id: Types.ObjectId;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true, type: Date })
  payment_date: Date;

  @Prop({ required: true })
  payment: number;

  @Prop({ required: true })
  payment_with_taxes: number;
}

export const PayableSchema = SchemaFactory.createForClass(Payable);
