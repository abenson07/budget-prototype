import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView,
  RefreshControl
} from 'react-native';
import { useTransactions } from '@/hooks/useStorage';
import TransactionItem from '@/components/TransactionItem';
import { Transaction } from '@/types/models';
import { format } from 'date-fns';
import { Filter } from 'lucide-react-native';

export default function TransactionsScreen() {
  const { 
    transactions, 
    loading, 
    fetchTransactions, 
    removeTransaction 
  } = useTransactions();
  
  const [refreshing, setRefreshing] = useState(false);
  const [groupedTransactions, setGroupedTransactions] = useState<{[key: string]: Transaction[]}>({});
  const [sortedDates, setSortedDates] = useState<string[]>([]);
  
  useEffect(() => {
    if (transactions.length > 0) {
      const grouped = transactions.reduce((groups: {[key: string]: Transaction[]}, transaction) => {
        const date = format(transaction.timestamp, 'yyyy-MM-dd');
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(transaction);
        return groups;
      }, {});
      
      // Sort transactions within each group
      Object.keys(grouped).forEach(date => {
        grouped[date].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      });
      
      setGroupedTransactions(grouped);
      
      // Sort dates from newest to oldest
      const dates = Object.keys(grouped).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
      setSortedDates(dates);
    } else {
      setGroupedTransactions({});
      setSortedDates([]);
    }
  }, [transactions]);
  
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTransactions();
    setRefreshing(false);
  };
  
  const handleTransactionPress = (transaction: Transaction) => {
    // Show transaction details or edit modal
    console.log('Transaction pressed:', transaction);
  };
  
  const renderDateHeader = (date: string) => {
    const formattedDate = format(new Date(date), 'EEEE, MMMM d, yyyy');
    
    return (
      <View style={styles.dateHeader}>
        <Text style={styles.dateHeaderText}>{formattedDate}</Text>
      </View>
    );
  };
  
  const renderTransactionGroup = ({ item: date }: { item: string }) => {
    return (
      <View style={styles.transactionGroup}>
        {renderDateHeader(date)}
        {groupedTransactions[date].map(transaction => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            onPress={handleTransactionPress}
          />
        ))}
      </View>
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Transaction History</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#4A5568" />
        </TouchableOpacity>
      </View>
      
      {transactions.length > 0 ? (
        <FlatList
          data={sortedDates}
          renderItem={renderTransactionGroup}
          keyExtractor={(date) => date}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateTitle}>No transactions yet</Text>
          <Text style={styles.emptyStateText}>
            Your transaction history will appear here
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingBottom: 16,
  },
  transactionGroup: {
    marginBottom: 16,
  },
  dateHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#EDF2F7',
  },
  dateHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A5568',
    fontFamily: 'Inter-Medium',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A5568',
    marginBottom: 8,
    fontFamily: 'Inter-Medium',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#A0AEC0',
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
});