import { Controller, Get } from '@nestjs/common';
import { PayablesService } from './payables.service';

@Controller('payables')
export class PayablesController {
  constructor(private readonly payablesService: PayablesService) {}

  @Get()
  findAll() {
    return this.payablesService.findAll();
  }
}
