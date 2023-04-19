import { client, defaultOptions } from './connect';
import { ConnectOptions, FindArgs } from '../models/options';
import { defaults } from '../../defaults';

export async function findOne(args: FindArgs) {
  const options: ConnectOptions & FindArgs = defaults(defaultOptions, args);

  return await client(options.uri)
    .connect()
    .then(async (client) => {
      return await client
        .db(options.dbName)
        .collection(options.collection)
        .findOne(options.query)
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

export async function find(args: FindArgs) {
  const options: ConnectOptions & FindArgs = defaults(defaultOptions, args);

  return await client(options.uri)
    .connect()
    .then(async (client) => {
      return await client
        .db(options.dbName)
        .collection(options.collection)
        .find(options.query)
        .toArray()
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
