import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsModule } from './transactions/transactions.module';
import { PayablesModule } from './payables/payables.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/pagarme'),
    TransactionsModule,
    PayablesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
