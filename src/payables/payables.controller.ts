import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PayablesService } from './payables.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';

@Controller('payables')
export class PayablesController {
  constructor(private readonly payablesService: PayablesService) {}

  @Post()
  create(@Body() createPayableDto: CreatePayableDto) {
    return this.payablesService.create(createPayableDto);
  }

  @Get()
  findAll() {
    return this.payablesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.payablesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePayableDto: UpdatePayableDto) {
    return this.payablesService.update(+id, updatePayableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.payablesService.remove(+id);
  }
}
