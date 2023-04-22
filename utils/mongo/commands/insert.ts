import { ConnectOptions, InsertArgs, InsertManyArgs } from '../models/options';
import { defaults } from '../../defaults';
import { client, defaultOptions } from './connect';

export async function insertOne(args: InsertArgs) {
  const options: ConnectOptions & InsertArgs = defaults(defaultOptions, args);

  return await client(options.uri)
    .connect()
    .then(async (client) => {
      return await client
        .db(options.dbName)
        .collection(options.collection)
        .insertOne(options.document)
        .then((result) => {
          return result;
        })
        .catch((err) => {
          throw err;
        })
        .finally(() => {
          client.close();
        });
    });
}

export async function insertMany(args: InsertManyArgs) {
  const options: ConnectOptions & InsertManyArgs = defaults(
    defaultOptions,
    args
  );

  return await client(options.uri)
    .connect()
    .then(async (client) => {
      return await client
        .db(options.dbName)
        .collection(options.collection)
        .insertMany(options.documents)
        .then((result) => {
          return result;
        })
        .catch((err) => {
          throw err;
        })
        .finally(() => {
          client.close();
        });
    });
}
