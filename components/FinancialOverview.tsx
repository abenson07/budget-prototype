import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { formatCurrency } from '../utils/formatters';
import { AppState } from '../types/models';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface FinancialOverviewProps {
  appState: AppState;
}

const FinancialOverview: React.FC<FinancialOverviewProps> = ({ appState }) => {
  const balanceScale = useSharedValue(0.95);
  const availableScale = useSharedValue(0.95);
  
  React.useEffect(() => {
    balanceScale.value = withSpring(1);
    availableScale.value = withSpring(1, { delay: 200 });
  }, []);
  
  const balanceStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: balanceScale.value }],
    };
  });
  
  const availableStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: availableScale.value }],
    };
  });
  
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.card, styles.totalCard, balanceStyle]}>
        <Text style={styles.cardLabel}>Total Balance</Text>
        <Text style={styles.totalBalance}>{formatCurrency(appState.totalBalance)}</Text>
      </Animated.View>
      
      <Animated.View style={[styles.card, styles.availableCard, availableStyle]}>
        <Text style={styles.cardLabel}>Available to Spend</Text>
        <Text style={styles.availableBalance}>{formatCurrency(appState.availableToSpend)}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  totalCard: {
    backgroundColor: '#4A6FA5',
  },
  availableCard: {
    backgroundColor: '#38B764',
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  totalBalance: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  availableBalance: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default FinancialOverview;