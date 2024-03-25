import { Module } from '@nestjs/common';
import { PayablesService } from './payables.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Payable, PayableSchema } from './schemas/payable.schema';

@Module({
  controllers: [],
  providers: [PayablesService],
  imports: [
    MongooseModule.forFeature([{ name: Payable.name, schema: PayableSchema }]),
  ],
  exports: [PayablesService],
})
export class PayablesModule {}
