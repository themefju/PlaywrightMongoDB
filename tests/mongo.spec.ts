import { expect, test } from '@playwright/test';
import { Collections } from '../utils/mongo/collections';
import { find, findOne } from '../utils/mongo/find';

test.describe('findOne', async () => {
  test('returns null', async () => {
    await findOne({
      query: { framework: '84302' },
      collection: Collections.ApiTests,
    }).then((result) => {
      expect(result).toBeNull();
    });
  });

  test('works with _id = ObjectId', async () => {
    await findOne({
      query: { type: 'not nested ObjectId' },
      collection: Collections.ApiTests,
    }).then((result) => {
      expect(result).not.toBeNull();
      expect(result.test).toEqual('ObjectId');
    });
  });

  test('works with _id = UUID', async () => {
    await findOne({
      query: { type: 'not nested UUID' },
      collection: Collections.ApiTests,
    }).then((result) => {
      expect(result).not.toBeNull();
      expect(result.test).toEqual('UUID');
    });
  });

  test('works with nested _id = ObjectId', async () => {
    await findOne({
      query: { type: 'nested ObjectId' },
      collection: Collections.ApiTests,
    }).then(async (result) => {
      await findOne({
        query: { _id: result['_id'] },
        collection: Collections.ApiTests,
      }).then((nestedResult) => {
        expect(result).not.toBeNull();
        expect(nestedResult.test).toEqual('ObjectId');
        expect(nestedResult.type).toEqual('nested ObjectId');
      });
    });
  });

  test('works with nested _id = UUID', async () => {
    await findOne({
      query: { type: 'nested UUID' },
      collection: Collections.ApiTests,
    }).then(async (result) => {
      await findOne({
        query: { _id: result['_id'] },
        collection: Collections.ApiTests,
      }).then((nestedResult) => {
        expect(nestedResult).not.toBeNull;
        expect(nestedResult.test).toEqual('UUID');
        expect(nestedResult.type).toEqual('nested UUID');
      });
    });
  });
});

test.describe('find', () => {
  test('returns empty array', async () => {
    await find({
      query: { framework: '84302' },
      collection: 'api-tests',
    }).then((result) => {
      expect(result).toEqual([]);
    });
  });

  test('works with _id = ObjectId', async () => {
    await find({
      query: { test: 'ObjectId' },
      collection: 'api-tests',
    }).then((result) => {
      expect(result).not.toBeNull;
      expect(result).toHaveLength(2);
    });
  });

  test('works with _id = UUID', async () => {
    await find({
      query: { test: 'UUID' },
      collection: 'api-tests',
    }).then((result) => {
      expect(result).not.toBeNull;
      expect(result).toHaveLength(2);
    });
  });
});
