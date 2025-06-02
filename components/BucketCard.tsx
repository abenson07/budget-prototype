import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { formatCurrency, calculatePercentage, getColorByPercentage, getBucketTypeColor } from '../utils/formatters';
import { Bucket } from '../types/models';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Bookmark, DollarSign } from 'lucide-react-native';

interface BucketCardProps {
  bucket: Bucket;
  onPress: (bucket: Bucket) => void;
}

const BucketCard: React.FC<BucketCardProps> = ({ bucket, onPress }) => {
  const percentage = calculatePercentage(bucket.balance, bucket.target);
  const progressWidth = useSharedValue(0);
  
  // Animate progress bar
  React.useEffect(() => {
    progressWidth.value = withTiming(percentage, { duration: 1000 });
  }, [percentage]);
  
  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${progressWidth.value}%`,
      backgroundColor: getColorByPercentage(percentage)
    };
  });
  
  const typeColor = getBucketTypeColor(bucket.type);
  
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => onPress(bucket)}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.nameContainer}>
          {bucket.type === 'safe' ? (
            <Bookmark size={18} color={typeColor} />
          ) : (
            <DollarSign size={18} color={typeColor} />
          )}
          <Text style={styles.name}>{bucket.name}</Text>
        </View>
        <View style={[styles.typeTag, { backgroundColor: typeColor }]}>
          <Text style={styles.typeText}>{bucket.type}</Text>
        </View>
      </View>
      
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Balance</Text>
        <Text style={styles.balance}>{formatCurrency(bucket.balance)}</Text>
      </View>
      
      <View style={styles.targetContainer}>
        <Text style={styles.targetText}>
          Target: {formatCurrency(bucket.target)}
        </Text>
        <Text style={styles.percentageText}>{percentage.toFixed(0)}%</Text>
      </View>
      
      <View style={styles.progressContainer}>
        <Animated.View style={[styles.progressBar, progressStyle]} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
    color: '#2D3748',
  },
  typeTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  balanceContainer: {
    marginBottom: 12,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 4,
  },
  balance: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D3748',
  },
  targetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  targetText: {
    fontSize: 14,
    color: '#718096',
  },
  percentageText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A5568',
  },
  progressContainer: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
});

export default BucketCard;