import { expect, test } from '@playwright/test';
import { Collections } from '../utils/collections';
import { find, findOne } from '../utils/mongo/commands/find';
import { insertMany, insertOne } from '../utils/mongo/commands/insert';
import { deleteMany, deleteOne } from '../utils/mongo/commands/delete';
import { updateMany, updateOne } from '../utils/mongo/commands/update';
import { aggregate } from '../utils/mongo/commands/aggregate';
import {
  deleteAllDataInDB,
  insertDataForFindCommandInDB,
} from '../utils/mongo';

test.describe('findOne', async () => {
  test.beforeEach(async () => {
    await deleteAllDataInDB();
    await insertDataForFindCommandInDB();
  });

  test('returns null', async () => {
    await findOne({
      query: { inserted: '84302' },
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
        query: { _id: result._id },
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
        query: { _id: result._id },
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
  test.beforeEach(async () => {
    await deleteAllDataInDB();
    await insertDataForFindCommandInDB();
  });

  test('returns empty array', async () => {
    await find({
      query: { framework: '84302' },
      collection: Collections.ApiTests,
    }).then((result) => {
      expect(result).toEqual([]);
    });
  });

  test('works with _id = ObjectId', async () => {
    await find({
      query: { test: 'ObjectId' },
      collection: Collections.ApiTests,
    }).then((result) => {
      expect(result).not.toBeNull;
      expect(result).toHaveLength(2);
    });
  });

  test('works with _id = UUID', async () => {
    await find({
      query: { test: 'UUID' },
      collection: Collections.ApiTests,
    }).then((result) => {
      expect(result).not.toBeNull;
      expect(result).toHaveLength(2);
    });
  });
});

test.describe('insert', () => {
  test.beforeEach(async () => {
    await deleteAllDataInDB();
  });

  test('inserts one document', async () => {
    await insertOne({
      document: { inserted: 1, hurra: false },
      collection: Collections.ApiTests,
    }).then((result) => {
      expect(result.acknowledged).toBeTruthy;
    });
  });

  test('inserts many documents at once', async () => {
    await insertMany({
      documents: [
        {
          inserted: 2,
          hurra: true,
          manyAtOnce: true,
        },
        {
          inserted: 3,
          hurra: true,
          manyAtOnce: true,
        },
        {
          inserted: 4,
          hurra: true,
          manyAtOnce: true,
        },
        {
          inserted: 5,
          hurra: true,
          manyAtOnce: true,
        },
        {
          inserted: 6,
          hurra: true,
          manyAtOnce: true,
        },
      ],
      collection: Collections.ApiTests,
    }).then((result) => {
      expect(result.acknowledged).toBeTruthy;
      expect(result.insertedCount).toEqual(5);
    });
  });
});

test.describe('update', () => {
  test.beforeEach(async () => {
    await deleteAllDataInDB();
    await insertDataForFindCommandInDB();
  });

  test('updates one document', async () => {
    await updateOne({
      filter: { updateOne: true },
      update: { $set: { updateManyFields: false } },
      collection: Collections.ApiTests,
    }).then((result) => {
      expect(result.acknowledged).toBeTruthy();
      expect(result.matchedCount).toEqual(1);
      expect(result.modifiedCount).toEqual(1);
      expect(result.upsertedId).toBeNull();
    });
  });

  test('updates many documents at once', async () => {
    await updateMany({
      filter: { updateOne: false },
      update: { $set: { updateManyFields: true } },
      collection: Collections.ApiTests,
    }).then((result) => {
      expect(result.acknowledged).toBeTruthy();
      expect(result.matchedCount).toEqual(5);
      expect(result.modifiedCount).toEqual(5);
    });
  });
});

test.describe('aggregate', () => {
  test.beforeEach(async () => {
    await deleteAllDataInDB();
    await insertDataForFindCommandInDB();
  });

  test('aggregate one document', async () => {
    await aggregate({
      pipeline: [
        { $match: { inserted: { $in: [1, 6] } } },
        { $set: { aggregated: true } },
      ],
      collection: Collections.ApiTests,
    }).then(async (result) => {
      if (!result) throw new Error("Result can't be null or undefined");

      expect(result).not.toBeNull;
      expect(result).toHaveLength(2);

      await findOne({
        query: { _id: result[0]._id },
        collection: Collections.ApiTests,
      }).then((result) => {
        expect(result).not.toBeNull;
        expect(result.inserted).toEqual(1);
      });
    });
  });
});

test.describe('delete', () => {
  test.beforeEach(async () => {
    await deleteAllDataInDB();
    await insertDataForFindCommandInDB();
  });

  test('deletes one document', async () => {
    await deleteOne({
      filter: { inserted: 3 },
      collection: Collections.ApiTests,
    }).then((result) => {
      expect(result.acknowledged).toBeTruthy();
    });
  });

  test('works with _id = UUID', async () => {
    await findOne({
      query: { test: 'UUID' },
      collection: Collections.ApiTests,
    }).then(async (result) => {
      if (!result) throw new Error("Result can't be null or undefined");

      await deleteOne({
        filter: { _id: result._id },
        collection: Collections.ApiTests,
      }).then((nestedResult) => {
        expect(nestedResult.acknowledged).toBeTruthy();
      });
    });
  });

  test('deletes many documents at once', async () => {
    await deleteMany({
      filter: {},
      collection: Collections.ApiTests,
    }).then(async (result) => {
      expect(result.acknowledged).toBeTruthy();

      await find({
        query: {},
        collection: Collections.ApiTests,
      }).then((result) => {
        expect(result).toEqual([]);
      });
    });
  });
});
