// Budget bucket types
export type BucketType = 'safe' | 'discretionary';

export interface Bucket {
  id: string;
  name: string;
  type: BucketType;
  target: number;
  balance: number;
}

// Transaction types
export interface Transaction {
  id: string;
  amount: number;
  bucketName: string;
  isCreditCard: boolean;
  timestamp: Date;
}

// App state
export interface AppState {
  totalBalance: number;
  availableToSpend: number;
}

// Storage keys
export enum StorageKeys {
  BUCKETS = 'buckets',
  TRANSACTIONS = 'transactions',
  APP_STATE = 'appState'
}