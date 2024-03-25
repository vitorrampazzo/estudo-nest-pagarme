import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from '../transactions.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { getModelToken } from '@nestjs/mongoose';
import mongoose, { Connection } from 'mongoose';
import { TransactionSchema } from '../schemas/transaction.schema';
import { PayablesService } from '../../payables/payables.service';
import { PayableSchema } from '../../payables/schemas/payable.schema';

describe('TransactionService', () => {
  let service: TransactionsService;
  let payableService: PayablesService;
  let mongod: MongoMemoryServer;
  let connection: Connection;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    connection = mongoose.createConnection(uri);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        {
          provide: 'DATABASE_CONNECTION',
          useValue: connection,
        },
        {
          provide: getModelToken('Transaction'),
          useFactory: () => connection.model('Transaction', TransactionSchema),
        },
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

    service = module.get<TransactionsService>(TransactionsService);
    payableService = module.get<PayablesService>(PayablesService);
  });

  afterAll(async () => {
    await mongod.stop();
    await connection.close();
  });

  beforeEach(async () => {
    await connection.model('Transaction').deleteMany({});
  });

  afterEach(async () => {
    await connection.model('Transaction').deleteMany({});
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(payableService).toBeDefined();
    expect(connection).toBeDefined();
  });

  it('should create a transaction', async () => {
    const transactionData = {
      description: 'Teste Jest',
      value: 100,
      method_payment: 'debit_card',
      card_number: '1234567890',
      card_owner: 'Vitor Rampazzo',
      card_validate: '2028-12-10',
      card_security: '132',
    };

    const createdTransaction = await service.create(transactionData);
    expect(createdTransaction).toHaveProperty('_id');
    expect(createdTransaction.description).toBe('Teste Jest');
    expect(createdTransaction.value).toBe(100);
  });

  it('should get a transaction by CardOwner and CardNumber', async () => {
    const transaction = {
      description: 'Teste',
      value: 100,
      method_payment: 'debit_card',
      card_number: '1234567890',
      card_owner: 'Vitor Rampazzo',
      card_validate: '2028-12-10',
      card_security: '132',
    };

    await service.create(transaction);
    const transactions = await service.findAllByCardOwnerAndCardNumber({
      card_owner: transaction.card_owner,
      card_number: transaction.card_number,
    });

    expect(transactions).toMatchObject({
      available: [transaction],
      waiting_funds: [],
    });
  });

  it('should return empty trying to get a transaction by wrong CardOwner and CardNumber', async () => {
    const transaction = {
      description: 'Teste',
      value: 100,
      method_payment: 'debit_card',
      card_number: '1234567890',
      card_owner: 'Vitor Rampazzo',
      card_validate: '2028-12-10',
      card_security: '132',
    };

    await service.create(transaction);
    const transactions = await service.findAllByCardOwnerAndCardNumber({
      card_owner: transaction.card_owner,
      card_number: '1234',
    });

    expect(transactions).toMatchObject({
      available: [],
      waiting_funds: [],
    });
  });
});
