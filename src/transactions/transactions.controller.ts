import { Controller, Get, Post, Body, Logger } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { transactionResponseDto } from './dto/transaction.dto';

@Controller('transactions')
export class TransactionsController {
  private readonly logger = new Logger('Transactions Controller');
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<transactionResponseDto> {
    this.logger.log(`create: Data: ${createTransactionDto}`);

    const transaction =
      await this.transactionsService.create(createTransactionDto);

    return transaction.toJSON();
  }

  @Get()
  async findAll(): Promise<transactionResponseDto[]> {
    const transaction = await this.transactionsService.findAll();
    return transaction;
  }
}
