import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Payable } from './schemas/payable.schema';
import { Model } from 'mongoose';

@Injectable()
export class PayablesService {
  constructor(
    @InjectModel(Payable.name)
    private readonly PayableModel: Model<Payable>,
  ) {}

  async findAll() {
    return await this.PayableModel.find();
  }

  async findOne(id: number) {
    return `This action returns a #${id} payable`;
  }
}
