import { Test, TestingModule } from '@nestjs/testing';
import { PayablesService } from '../payables.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { getModelToken } from '@nestjs/mongoose';
import mongoose, { Connection } from 'mongoose';
import { PayableSchema } from '../schemas/payable.schema';
import { transactionDto } from '../dto/transaction.dto';

describe('PayableService', () => {
  let service: PayablesService;
  let mongod: MongoMemoryServer;
  let connection: Connection;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    connection = mongoose.createConnection(uri);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PayablesService,
        {
          provide: 'DATABASE_CONNECTION',
          useValue: connection,
        },
        {
          provide: getModelToken('Payable'),
          useFactory: () => connection.model('Payable', PayableSchema),
        },
      ],
    }).compile();

    service = module.get<PayablesService>(PayablesService);
  });

  afterAll(async () => {
    await mongod.stop();
    await connection.close();
  });

  beforeEach(async () => {
    await connection.model('Payable').deleteMany({});
  });

  afterEach(async () => {
    await connection.model('Payable').deleteMany({});
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(connection).toBeDefined();
  });

  it('shouldnt create a not allowed method payable', async () => {
    const transaction: transactionDto = {
      value: 100,
      description: 'Payment',
      method_payment: 'pix',
      card_number: '1234567890',
      card_owner: 'John Doe',
      card_validate: '2028-12-10',
      card_security: '132',
    };

    const result = await service.create(transaction);
    expect(result).toBe('Method payment: pix is not allowed');
  });
});
