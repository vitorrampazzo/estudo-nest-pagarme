import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PayableDocument = HydratedDocument<Payable>;

@Schema()
export class Payable {
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
