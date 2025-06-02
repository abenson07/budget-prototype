import React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { useAppState } from '@/hooks/useStorage';
import { formatCurrency } from '@/utils/formatters';

export default function HomeScreen() {
  const { appState, loading } = useAppState();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Budget Flow</Text>
      </View>

      <View style={styles.content}>
        <View style={[styles.card, styles.availableCard]}>
          <Text style={styles.cardLabel}>Available to Spend</Text>
          <Text style={styles.cardAmount}>
            {loading ? '...' : formatCurrency(appState.availableToSpend)}
          </Text>
        </View>

        <View style={[styles.card, styles.balanceCard]}>
          <Text style={styles.cardLabel}>Total Balance</Text>
          <Text style={styles.cardAmount}>
            {loading ? '...' : formatCurrency(appState.totalBalance)}
          </Text>
        </View>
      </View>
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
    fontSize: 28,
    fontWeight: '700',
    color: '#2D3748',
    fontFamily: 'Inter-Bold',
  },
  content: {
    padding: 16,
  },
  card: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  availableCard: {
    backgroundColor: '#38B764',
  },
  balanceCard: {
    backgroundColor: '#4A6FA5',
  },
  cardLabel: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
    fontFamily: 'Inter-Medium',
  },
  cardAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
});