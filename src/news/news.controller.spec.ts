import { Test, TestingModule } from '@nestjs/testing';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { ResponsePatternService } from '../shared/services/response-pattern/response-pattern.service';

describe('NewsController', () => {
  let controller: NewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsController],
      providers: [{
        provide: NewsService,
        useValue: {
          findAll: jest.fn(),
          create: jest.fn(),
          findOne: jest.fn(),
          remove: jest.fn(),
        },
      },
      {
        provide: ResponsePatternService,
        useValue: {
          getResponse: jest.fn(),
        },
      },
      ],
    }).compile();

    controller = module.get<NewsController>(NewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
