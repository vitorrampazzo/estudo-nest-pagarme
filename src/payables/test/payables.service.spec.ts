import { Test, TestingModule } from '@nestjs/testing';
import { PayablesService } from '../payables.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { getModelToken } from '@nestjs/mongoose';
import mongoose, { Connection } from 'mongoose';
import { PayableSchema } from '../schemas/payable.schema';

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
});
