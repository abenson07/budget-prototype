import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { formatCurrency, formatDateTime } from '../utils/formatters';
import { Transaction } from '../types/models';
import { ArrowDownRight, ArrowUpRight, CreditCard, Wallet } from 'lucide-react-native';

interface TransactionItemProps {
  transaction: Transaction;
  onPress: (transaction: Transaction) => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onPress }) => {
  const isPositive = transaction.amount >= 0;
  
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => onPress(transaction)}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        {transaction.isCreditCard ? (
          <CreditCard size={24} color="#6A7FDB" />
        ) : (
          <Wallet size={24} color="#4A6FA5" />
        )}
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.bucketName}>{transaction.bucketName}</Text>
        <Text style={styles.timestamp}>{formatDateTime(transaction.timestamp)}</Text>
      </View>
      
      <View style={styles.amountContainer}>
        <View style={styles.amountRow}>
          {isPositive ? (
            <ArrowUpRight size={16} color="#38B764" />
          ) : (
            <ArrowDownRight size={16} color="#FF5252" />
          )}
          <Text style={[
            styles.amount,
            { color: isPositive ? '#38B764' : '#FF5252' }
          ]}>
            {formatCurrency(Math.abs(transaction.amount))}
          </Text>
        </View>
        <View style={[
          styles.methodTag,
          { backgroundColor: transaction.isCreditCard ? '#EBF4FF' : '#F0FFF4' }
        ]}>
          <Text style={[
            styles.methodText,
            { color: transaction.isCreditCard ? '#3182CE' : '#38A169' }
          ]}>
            {transaction.isCreditCard ? 'Credit Card' : 'Cash/Debit'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  bucketName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#718096',
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 4,
  },
  methodTag: {
    marginTop: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  methodText: {
    fontSize: 10,
    fontWeight: '500',
  },
});

export default TransactionItem;