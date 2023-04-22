import { AggregateArgs, ConnectOptions } from '../models/options';
import { defaults } from '../../defaults';
import { client, defaultOptions } from './connect';

export async function aggregate(args: AggregateArgs) {
  const options: ConnectOptions & AggregateArgs = defaults(
    defaultOptions,
    args
  );

  return await client(options.uri)
    .connect()
    .then(async (client) => {
      return await client
        .db(options.dbName)
        .collection(options.collection)
        .aggregate(options.pipeline, options.options)
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
