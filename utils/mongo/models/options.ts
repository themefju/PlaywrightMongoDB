import { Document } from 'mongodb';

export interface ConnectOptions {
  uri: string;
  dbName: string;
}

export interface FindArgs {
  collection: string;
  query: Document;
}

export interface InsertArgs {
  collection: string;
  document: Document;
}

export interface InsertManyArgs {
  collection: string;
  documents: Document[];
}
