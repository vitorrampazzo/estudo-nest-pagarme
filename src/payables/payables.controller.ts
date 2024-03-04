import { Controller, Get, Logger } from '@nestjs/common';
import { PayablesService } from './payables.service';

@Controller('payables')
export class PayablesController {
  private readonly logger = new Logger('Payable Controller');
  constructor(private readonly payablesService: PayablesService) {}

  @Get()
  findAll() {
    this.logger.log(`Find All`);
    return this.payablesService.findAll();
  }
}
