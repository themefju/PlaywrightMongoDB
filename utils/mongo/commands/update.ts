import { client, defaultOptions } from './connect';
import { ConnectOptions, UpdateArgs } from '../models/options';
import { defaults } from '../../defaults';

export async function updateOne(args: UpdateArgs) {
  const options: ConnectOptions & UpdateArgs = defaults(defaultOptions, args);

  return await client(options.uri)
    .connect()
    .then(async (client) => {
      return await client
        .db(options.dbName)
        .collection(options.collection)
        .updateOne(options.filter, options.update, options.options)
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

export async function updateMany(args: UpdateArgs) {
  const options: ConnectOptions & UpdateArgs = defaults(defaultOptions, args);

  return await client(options.uri)
    .connect()
    .then(async (client) => {
      return await client
        .db(options.dbName)
        .collection(options.collection)
        .updateMany(options.filter, options.update, options.options)
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
