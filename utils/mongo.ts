import { ObjectId } from 'bson';
import { Collections } from './mongo/commands/collections';
import { deleteMany } from './mongo/commands/delete';
import { insertMany } from './mongo/commands/insert';

export async function deleteAllDataInDB() {
  await deleteMany({
    collection: Collections.ApiTests,
    filter: {},
  }).then(() => console.log('Data deleted!'));
}

export async function insertDataForFindCommandInDB() {
  await insertMany({
    collection: Collections.ApiTests,
    documents: [
      {
        inserted: 1,
        hurra: false,
      },
      {
        _id: new ObjectId(),
        inserted: 2,
        hurra: true,
        manyAtOnce: true,
        type: 'not nested ObjectId',
        test: 'ObjectId',
      },
      {
        inserted: 3,
        hurra: true,
        manyAtOnce: true,
        type: 'not nested UUID',
        test: 'UUID',
      },
      {
        _id: new ObjectId(),
        inserted: 4,
        hurra: true,
        manyAtOnce: true,
        type: 'nested ObjectId',
        test: 'ObjectId',
      },
      {
        inserted: 5,
        hurra: true,
        manyAtOnce: true,
        type: 'nested UUID',
        test: 'UUID',
      },
      {
        inserted: 6,
        hurra: true,
        manyAtOnce: true,
      },
    ],
  }).then(() => console.log('Data inserted!'));
}
