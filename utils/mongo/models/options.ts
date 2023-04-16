import { Document } from 'mongodb';
import { Collections } from '../collections';

export interface ConnectOptions {
  uri: string;
  dbName: string;
}

interface DefaultArgs {
  collection: Collections;
}

export interface DeleteArgs extends DefaultArgs {
  filter: Document;
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
