import { ObjectId } from 'bson';
import { Collections } from './collections';
import { deleteMany } from './mongo/commands/delete';
import { insertMany } from './mongo/commands/insert';

export async function deleteAllDataInDB() {
  await deleteMany({
    collection: Collections.ApiTests,
    filter: {},
  }).then(() => console.log('Data deleted!'));
}

export async function insertDataInDB() {
  await insertMany({
    collection: Collections.ApiTests,
    documents: [
      {
        inserted: 1,
        updateOne: true,
        manyAtOnce: true,
        updateManyFields: 'true',
      },
      {
        _id: new ObjectId(),
        inserted: 2,
        updateOne: false,
        manyAtOnce: true,
        type: 'not nested ObjectId',
        test: 'ObjectId',
        updateManyFields: 'false',
      },
      {
        inserted: 3,
        updateOne: false,
        manyAtOnce: true,
        type: 'not nested UUID',
        test: 'UUID',
        updateManyFields: 'false',
      },
      {
        _id: new ObjectId(),
        inserted: 4,
        updateOne: false,
        manyAtOnce: true,
        type: 'nested ObjectId',
        test: 'ObjectId',
        updateManyFields: 'false',
      },
      {
        inserted: 5,
        updateOne: false,
        manyAtOnce: true,
        type: 'nested UUID',
        test: 'UUID',
        updateManyFields: 'false',
      },
      {
        inserted: 6,
        updateOne: false,
        manyAtOnce: true,
        updateManyFields: 'false',
      },
    ],
  }).then(() => console.log('Data inserted!'));
}
