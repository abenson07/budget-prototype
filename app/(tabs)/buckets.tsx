import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from 'react-native';
import { useBuckets } from '@/hooks/useStorage';
import { formatCurrency } from '@/utils/formatters';

export default function BucketsScreen() {
  const { buckets, loading } = useBuckets();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Budget Buckets</Text>
      </View>

      <ScrollView style={styles.content}>
        {loading ? (
          <Text style={styles.loadingText}>Loading buckets...</Text>
        ) : (
          buckets.map((bucket) => (
            <View key={bucket.id} style={styles.bucketCard}>
              <View style={styles.bucketHeader}>
                <Text style={styles.bucketName}>{bucket.name}</Text>
                <View style={[
                  styles.typeTag,
                  { backgroundColor: bucket.type === 'safe' ? '#4A6FA5' : '#6A7FDB' }
                ]}>
                  <Text style={styles.typeText}>{bucket.type}</Text>
                </View>
              </View>
              <View style={styles.balanceContainer}>
                <Text style={styles.balanceLabel}>Current Balance</Text>
                <Text style={styles.balanceAmount}>
                  {formatCurrency(bucket.balance)}
                </Text>
              </View>
              <View style={styles.targetContainer}>
                <Text style={styles.targetLabel}>Target: {formatCurrency(bucket.target)}</Text>
                <Text style={styles.progressText}>
                  {((bucket.balance / bucket.target) * 100).toFixed(0)}%
                </Text>
              </View>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${Math.min((bucket.balance / bucket.target) * 100, 100)}%` }
                  ]}
                />
              </View>
            </View>
          ))
        )}
      </ScrollView>
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
    flex: 1,
    padding: 16,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 24,
    color: '#718096',
    fontFamily: 'Inter-Regular',
  },
  bucketCard: {
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
  bucketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  bucketName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    fontFamily: 'Inter-Medium',
  },
  typeTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  balanceContainer: {
    marginBottom: 12,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 4,
    fontFamily: 'Inter-Regular',
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D3748',
    fontFamily: 'Inter-Bold',
  },
  targetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  targetLabel: {
    fontSize: 14,
    color: '#718096',
    fontFamily: 'Inter-Regular',
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A5568',
    fontFamily: 'Inter-Medium',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4A6FA5',
    borderRadius: 4,
  },
});