import { Document } from 'mongodb';

export interface ConnectOptions {
  uri: string;
  dbName: string;
}

interface DefaultArgs {
  collection: string;
}

export interface FindArgs extends DefaultArgs {
  query: Document;
}

export interface InsertArgs extends DefaultArgs {
  document: Document;
}

export interface InsertManyArgs extends DefaultArgs {
  documents: Document[];
}
