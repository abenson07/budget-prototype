import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, Bucket, StorageKeys, Transaction } from '../types/models';

// Initial seed data
const initialBuckets: Bucket[] = [
  { id: '1', name: 'Rent', type: 'safe', target: 1200, balance: 600 },
  { id: '2', name: 'Groceries', type: 'safe', target: 400, balance: 100 },
  { id: '3', name: 'Utilities', type: 'safe', target: 150, balance: 50 },
  { id: '4', name: 'Dining Out', type: 'discretionary', target: 100, balance: 75 },
  { id: '5', name: 'Shopping', type: 'discretionary', target: 150, balance: 120 },
  { id: '6', name: 'Subscriptions', type: 'discretionary', target: 50, balance: 30 }
];

const initialAppState: AppState = {
  totalBalance: 1025,
  availableToSpend: 225
};

const initialTransactions: Transaction[] = [
  {
    id: '1',
    amount: 600,
    bucketName: 'Rent',
    isCreditCard: false,
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
  },
  {
    id: '2',
    amount: 100,
    bucketName: 'Groceries',
    isCreditCard: true,
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
  },
  {
    id: '3',
    amount: 50,
    bucketName: 'Utilities',
    isCreditCard: false,
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
  },
  {
    id: '4',
    amount: 75,
    bucketName: 'Dining Out',
    isCreditCard: true,
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
  }
];

// Initialize the app data
export const initializeAppData = async () => {
  try {
    // Check if data already exists
    const bucketsData = await AsyncStorage.getItem(StorageKeys.BUCKETS);
    if (!bucketsData) {
      await AsyncStorage.setItem(StorageKeys.BUCKETS, JSON.stringify(initialBuckets));
    }

    const transactionsData = await AsyncStorage.getItem(StorageKeys.TRANSACTIONS);
    if (!transactionsData) {
      await AsyncStorage.setItem(StorageKeys.TRANSACTIONS, JSON.stringify(initialTransactions));
    }

    const appStateData = await AsyncStorage.getItem(StorageKeys.APP_STATE);
    if (!appStateData) {
      await AsyncStorage.setItem(StorageKeys.APP_STATE, JSON.stringify(initialAppState));
    }

    return true;
  } catch (error) {
    console.error('Error initializing app data:', error);
    return false;
  }
};

// Bucket CRUD operations
export const getBuckets = async (): Promise<Bucket[]> => {
  try {
    const data = await AsyncStorage.getItem(StorageKeys.BUCKETS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error fetching buckets:', error);
    return [];
  }
};

export const saveBucket = async (bucket: Bucket): Promise<boolean> => {
  try {
    const buckets = await getBuckets();
    const existingIndex = buckets.findIndex(b => b.id === bucket.id);
    
    if (existingIndex >= 0) {
      buckets[existingIndex] = bucket;
    } else {
      bucket.id = Date.now().toString();
      buckets.push(bucket);
    }
    
    await AsyncStorage.setItem(StorageKeys.BUCKETS, JSON.stringify(buckets));
    return true;
  } catch (error) {
    console.error('Error saving bucket:', error);
    return false;
  }
};

export const deleteBucket = async (bucketId: string): Promise<boolean> => {
  try {
    const buckets = await getBuckets();
    const updatedBuckets = buckets.filter(b => b.id !== bucketId);
    await AsyncStorage.setItem(StorageKeys.BUCKETS, JSON.stringify(updatedBuckets));
    return true;
  } catch (error) {
    console.error('Error deleting bucket:', error);
    return false;
  }
};

// Transaction CRUD operations
export const getTransactions = async (): Promise<Transaction[]> => {
  try {
    const data = await AsyncStorage.getItem(StorageKeys.TRANSACTIONS);
    const transactions = data ? JSON.parse(data) : [];
    
    // Convert string dates back to Date objects
    return transactions.map((t: any) => ({
      ...t,
      timestamp: new Date(t.timestamp)
    }));
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
};

export const saveTransaction = async (transaction: Transaction): Promise<boolean> => {
  try {
    const transactions = await getTransactions();
    
    if (!transaction.id) {
      transaction.id = Date.now().toString();
    }
    
    const existingIndex = transactions.findIndex(t => t.id === transaction.id);
    
    if (existingIndex >= 0) {
      transactions[existingIndex] = transaction;
    } else {
      transactions.push(transaction);
    }
    
    await AsyncStorage.setItem(StorageKeys.TRANSACTIONS, JSON.stringify(transactions));
    
    // Update bucket balance
    await updateBucketBalance(transaction);
    
    return true;
  } catch (error) {
    console.error('Error saving transaction:', error);
    return false;
  }
};

export const deleteTransaction = async (transactionId: string): Promise<boolean> => {
  try {
    const transactions = await getTransactions();
    const transaction = transactions.find(t => t.id === transactionId);
    
    if (transaction) {
      // Reverse the transaction effect on the bucket
      const reversedTransaction = {
        ...transaction,
        amount: -transaction.amount
      };
      await updateBucketBalance(reversedTransaction as Transaction);
    }
    
    const updatedTransactions = transactions.filter(t => t.id !== transactionId);
    await AsyncStorage.setItem(StorageKeys.TRANSACTIONS, JSON.stringify(updatedTransactions));
    
    return true;
  } catch (error) {
    console.error('Error deleting transaction:', error);
    return false;
  }
};

// App state operations
export const getAppState = async (): Promise<AppState> => {
  try {
    const data = await AsyncStorage.getItem(StorageKeys.APP_STATE);
    return data ? JSON.parse(data) : initialAppState;
  } catch (error) {
    console.error('Error fetching app state:', error);
    return initialAppState;
  }
};

export const updateAppState = async (appState: Partial<AppState>): Promise<boolean> => {
  try {
    const currentState = await getAppState();
    const updatedState = { ...currentState, ...appState };
    await AsyncStorage.setItem(StorageKeys.APP_STATE, JSON.stringify(updatedState));
    return true;
  } catch (error) {
    console.error('Error updating app state:', error);
    return false;
  }
};

// Helper function to update bucket balance when a transaction is added
const updateBucketBalance = async (transaction: Transaction): Promise<void> => {
  try {
    const buckets = await getBuckets();
    const bucketIndex = buckets.findIndex(b => b.name === transaction.bucketName);
    
    if (bucketIndex >= 0) {
      buckets[bucketIndex].balance += transaction.amount;
      await AsyncStorage.setItem(StorageKeys.BUCKETS, JSON.stringify(buckets));
      
      // Update app state
      await updateAppStateFromBuckets(buckets);
    }
  } catch (error) {
    console.error('Error updating bucket balance:', error);
  }
};

// Calculate and update app state based on buckets
export const updateAppStateFromBuckets = async (buckets: Bucket[]): Promise<void> => {
  try {
    const totalBalance = buckets.reduce((sum, bucket) => sum + bucket.balance, 0);
    const safeBucketsBalance = buckets
      .filter(b => b.type === 'safe')
      .reduce((sum, bucket) => sum + bucket.balance, 0);
    
    const discretionaryBucketsBalance = buckets
      .filter(b => b.type === 'discretionary')
      .reduce((sum, bucket) => sum + bucket.balance, 0);
    
    // Available to spend is the sum of all discretionary bucket balances
    const availableToSpend = discretionaryBucketsBalance;
    
    await updateAppState({
      totalBalance,
      availableToSpend
    });
  } catch (error) {
    console.error('Error updating app state from buckets:', error);
  }
};