import { ResponseActions, ResponseTypes } from '../../interfaces/response-type.interfaces';
import { ResponsePattern, ResponsePatternPipeParams } from './response-pattern.interface';
import { ResponsePatternPipe } from './response-pattern.pipe';

describe('ResponsePatternPipe', () => {

  const pipe = new ResponsePatternPipe();

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  const runTest = (responseType: ResponseTypes, action: ResponseActions, descriptionPrefix: string, expectedError: boolean) => {
    const value: ResponsePatternPipeParams<{}> = {
      responseType,
      entityName: "Fake Entity",
      data: {},
      action
    };

    const expectedResult: ResponsePattern<{}> = {
      error: expectedError,
      description: `${descriptionPrefix} a Fake Entity`,
      data: {}
    };
    expect(pipe.transform(value)).toEqual(expectedResult);
  };

  const runArrayCaseTest = (responseType: ResponseTypes, action: ResponseActions, descriptionPrefix: string, data: any[], listData: {
    count: number;
    range: number;
    pages: number;
    actualPage: number;
  }) => {
    const value: ResponsePatternPipeParams<any[]> = {
      responseType,
      entityName: "Fake Entity",
      data,
      action
    };

    const expectedResult: ResponsePattern<any[]> = {
      error: false,
      description: `${descriptionPrefix} a Fake Entity`,
      data,
      ...listData
    };
    expect(pipe.transform(value)).toEqual(expectedResult);
  };

  describe('Error Cases', () => {
    it('should return fail to create', () => {
      runTest(ResponseTypes.error, ResponseActions.create, 'Failed to create', true);
    });

    it('should return fail to edit', () => {
      runTest(ResponseTypes.error, ResponseActions.edit, 'Failed to edit', true);
    });

    it('should return fail to getAll', () => {
      runTest(ResponseTypes.error, ResponseActions.getAll, 'Failed to return', true);
    });

    it('should return fail to get', () => {
      runTest(ResponseTypes.error, ResponseActions.get, 'Failed to return', true);
    });

    it('should return fail to delete', () => {
      runTest(ResponseTypes.error, ResponseActions.delete, 'Failed to delete', true);
    });
  });

  describe('Success Cases', () => {
    it('should return success on create', () => {
      runTest(ResponseTypes.success, ResponseActions.create, 'Success on create', false);
    });

    it('should return success on edit', () => {
      runTest(ResponseTypes.success, ResponseActions.edit, 'Success on edit', false);
    });

    it('should return success on getAll', () => {
      runTest(ResponseTypes.success, ResponseActions.getAll, 'Success on return', false);
    });

    it('should return success on get', () => {
      runTest(ResponseTypes.success, ResponseActions.get, 'Success on return', false);
    });

    it('should return success on delete', () => {
      runTest(ResponseTypes.success, ResponseActions.delete, 'Success on delete', false);
    });
  });

  describe("Array Data Cases", () => {
    const count = 8
    it('should return success to create', () => {

      runArrayCaseTest(ResponseTypes.success, ResponseActions.create, 'Success on create', new Array(count).fill({}), {
        count,
        range: 5,
        pages: 2,
        actualPage: 1,
      });
    });

    it('should return success to getAll', () => {
      runArrayCaseTest(ResponseTypes.success, ResponseActions.getAll, 'Success on return', new Array(count).fill({}), {
        count,
        range: 5,
        pages: 2,
        actualPage: 1,
      });
    });
  })
});
