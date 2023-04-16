import { Document } from 'mongodb';

export interface ConnectOptions {
  uri: string;
  dbName: string;
}

export interface FindArgs {
  collection: string;
  query: Document;
}
