import { ResponsePatternPipe } from '../../pipes/response-pattern/response-pattern.pipe';
import { ResponseActions, ResponseTypes } from '../../interfaces/response-type.interfaces';
import { Test, TestingModule } from '@nestjs/testing';
import { ResponsePatternService } from './response-pattern.service';

describe('ResponsePatternService', () => {
  let service: ResponsePatternService;
  let responsePatternPipe: ResponsePatternPipe;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResponsePatternService,
        {
          provide: ResponsePatternPipe,
          useValue: {
            transform: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ResponsePatternService>(ResponsePatternService);
    responsePatternPipe = module.get<ResponsePatternPipe>(ResponsePatternPipe);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getResponse', () => {
    it('should return success response', async () => {
      const mockData = { id: 1, name: 'Test' };
      const entityName = 'TestEntity';

      const mockResponse = Promise.resolve(mockData);
      const expectedResult = {
        responseType: ResponseTypes.success,
        data: mockData,
        entityName,
        action: ResponseActions.create,
      };

      (responsePatternPipe.transform as jest.Mock).mockReturnValue(expectedResult);

      const result = await service.getResponse(mockResponse, entityName);
      expect(result).toEqual(expectedResult);
      expect(responsePatternPipe.transform).toHaveBeenCalledWith({
        responseType: ResponseTypes.success,
        data: mockData,
        entityName,
        action: ResponseActions.create,
      });
    });

    it('should return error response', async () => {
      const mockError = { driverError: { detail: 'Error detail' } };
      const entityName = 'TestEntity';

      const mockResponse = Promise.reject(mockError);
      const expectedResult = {
        responseType: ResponseTypes.error,
        data: mockError,
        entityName,
        action: ResponseActions.create,
        description: 'Error detail',
      };

      (responsePatternPipe.transform as jest.Mock).mockReturnValue(expectedResult);

      try {
        await service.getResponse(mockResponse, entityName);
      } catch (result) {
        expect(result).toEqual(expectedResult);
        expect(responsePatternPipe.transform).toHaveBeenCalledWith({
          responseType: ResponseTypes.error,
          data: mockError,
          entityName,
          action: ResponseActions.create,
          description: 'Error detail',
        });
      }
    });
  });
});