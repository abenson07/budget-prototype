import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useBuckets, useTransactions, useAppState } from '@/hooks/useStorage';
import { useRouter } from 'expo-router';
import { CreditCard, DollarSign, Plus } from 'lucide-react-native';
import AddTransactionModal from '@/components/AddTransactionModal';
import AddBucketModal from '@/components/AddBucketModal';
import { BucketType } from '@/types/models';

export default function AddScreen() {
  const router = useRouter();
  const { addTransaction } = useTransactions();
  const { addBucket, fetchBuckets } = useBuckets();
  const { fetchAppState } = useAppState();
  
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showBucketModal, setShowBucketModal] = useState(false);
  
  const handleAddTransaction = async (data: {
    amount: number;
    bucketName: string;
    isCreditCard: boolean;
    timestamp: Date;
  }) => {
    const success = await addTransaction(data);
    if (success) {
      setShowTransactionModal(false);
      await Promise.all([fetchAppState(), fetchBuckets()]);
      // Navigate to home after successful transaction
      router.replace('/');
    }
  };
  
  const handleAddBucket = async (data: {
    name: string;
    type: BucketType;
    target: number;
    balance: number;
  }) => {
    const success = await addBucket(data);
    if (success) {
      setShowBucketModal(false);
      await Promise.all([fetchAppState(), fetchBuckets()]);
      // Navigate to home after successful bucket creation
      router.replace('/');
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Add New</Text>
      </View>
      
      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.optionCard}
          onPress={() => setShowTransactionModal(true)}
          activeOpacity={0.7}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#E6FFFA' }]}>
            <DollarSign size={28} color="#38B764" />
          </View>
          <View style={styles.optionInfo}>
            <Text style={styles.optionTitle}>New Transaction</Text>
            <Text style={styles.optionDescription}>
              Record income or expenses for a budget bucket
            </Text>
          </View>
          <Plus size={24} color="#4A5568" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.optionCard}
          onPress={() => setShowBucketModal(true)}
          activeOpacity={0.7}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#EBF8FF' }]}>
            <CreditCard size={28} color="#4A6FA5" />
          </View>
          <View style={styles.optionInfo}>
            <Text style={styles.optionTitle}>New Budget Bucket</Text>
            <Text style={styles.optionDescription}>
              Create a new category for your budget
            </Text>
          </View>
          <Plus size={24} color="#4A5568" />
        </TouchableOpacity>
      </View>
      
      <AddTransactionModal
        visible={showTransactionModal}
        onClose={() => setShowTransactionModal(false)}
        onSave={handleAddTransaction}
      />
      
      <AddBucketModal
        visible={showBucketModal}
        onClose={() => setShowBucketModal(false)}
        onSave={handleAddBucket}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2D3748',
    fontFamily: 'Inter-Bold',
  },
  content: {
    flex: 1,
    padding: 16,
    paddingTop: 24,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionInfo: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
    fontFamily: 'Inter-Medium',
  },
  optionDescription: {
    fontSize: 14,
    color: '#718096',
    fontFamily: 'Inter-Regular',
  },
});