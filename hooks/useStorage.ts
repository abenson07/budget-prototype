import { useEffect, useState } from 'react';
import { AppState, Bucket, Transaction } from '../types/models';
import * as StorageService from '../services/storageService';

// Hook for managing buckets
export const useBuckets = () => {
  const [buckets, setBuckets] = useState<Bucket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBuckets = async () => {
    try {
      setLoading(true);
      const data = await StorageService.getBuckets();
      setBuckets(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch buckets');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addBucket = async (bucket: Omit<Bucket, 'id'>) => {
    try {
      const newBucket = { ...bucket, id: Date.now().toString() };
      const success = await StorageService.saveBucket(newBucket as Bucket);
      if (success) {
        await fetchBuckets();
        return true;
      }
      return false;
    } catch (err) {
      setError('Failed to add bucket');
      console.error(err);
      return false;
    }
  };

  const updateBucket = async (bucket: Bucket) => {
    try {
      const success = await StorageService.saveBucket(bucket);
      if (success) {
        await fetchBuckets();
        return true;
      }
      return false;
    } catch (err) {
      setError('Failed to update bucket');
      console.error(err);
      return false;
    }
  };

  const removeBucket = async (bucketId: string) => {
    try {
      const success = await StorageService.deleteBucket(bucketId);
      if (success) {
        await fetchBuckets();
        return true;
      }
      return false;
    } catch (err) {
      setError('Failed to remove bucket');
      console.error(err);
      return false;
    }
  };

  useEffect(() => {
    fetchBuckets();
  }, []);

  return {
    buckets,
    loading,
    error,
    fetchBuckets,
    addBucket,
    updateBucket,
    removeBucket
  };
};

// Hook for managing transactions
export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const data = await StorageService.getTransactions();
      setTransactions(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch transactions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    try {
      const newTransaction = {
        ...transaction,
        id: Date.now().toString()
      };
      const success = await StorageService.saveTransaction(newTransaction as Transaction);
      if (success) {
        await fetchTransactions();
        return true;
      }
      return false;
    } catch (err) {
      setError('Failed to add transaction');
      console.error(err);
      return false;
    }
  };

  const removeTransaction = async (transactionId: string) => {
    try {
      const success = await StorageService.deleteTransaction(transactionId);
      if (success) {
        await fetchTransactions();
        return true;
      }
      return false;
    } catch (err) {
      setError('Failed to remove transaction');
      console.error(err);
      return false;
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return {
    transactions,
    loading,
    error,
    fetchTransactions,
    addTransaction,
    removeTransaction
  };
};

// Hook for managing app state
export const useAppState = () => {
  const [appState, setAppState] = useState<AppState>({
    totalBalance: 0,
    availableToSpend: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppState = async () => {
    try {
      setLoading(true);
      const data = await StorageService.getAppState();
      setAppState(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch app state');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateAppState = async (newState: Partial<AppState>) => {
    try {
      const success = await StorageService.updateAppState(newState);
      if (success) {
        await fetchAppState();
        return true;
      }
      return false;
    } catch (err) {
      setError('Failed to update app state');
      console.error(err);
      return false;
    }
  };

  useEffect(() => {
    fetchAppState();
  }, []);

  return {
    appState,
    loading,
    error,
    fetchAppState,
    updateAppState
  };
};