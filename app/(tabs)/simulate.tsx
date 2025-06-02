import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useBuckets, useTransactions } from '@/hooks/useStorage';
import { useRouter } from 'expo-router';

export default function SimulateScreen() {
  const router = useRouter();
  const { buckets } = useBuckets();
  const { addTransaction } = useTransactions();
  
  const [amount, setAmount] = useState('');
  const [selectedBucket, setSelectedBucket] = useState('');
  const [isCreditCard, setIsCreditCard] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    
    if (!amount || !selectedBucket) {
      setError('Please fill in all fields');
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    const success = await addTransaction({
      amount: parsedAmount,
      bucketName: selectedBucket,
      isCreditCard,
      timestamp: new Date(),
    });

    if (success) {
      setAmount('');
      setSelectedBucket('');
      setIsCreditCard(false);
      router.push('/');
    } else {
      setError('Failed to create transaction');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Simulate Transaction</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.form}>
          <Text style={styles.label}>Amount</Text>
          <View style={styles.amountContainer}>
            <Text style={styles.currencySymbol}>$</Text>
            <TextInput
              style={styles.amountInput}
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
              placeholder="0.00"
              placeholderTextColor="#A0AEC0"
            />
          </View>

          <Text style={styles.label}>Select Bucket</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedBucket}
              onValueChange={setSelectedBucket}
              style={styles.picker}
            >
              <Picker.Item label="Select a bucket" value="" />
              {buckets.map((bucket) => (
                <Picker.Item
                  key={bucket.id}
                  label={bucket.name}
                  value={bucket.name}
                />
              ))}
            </Picker>
          </View>

          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Use Credit Card</Text>
            <Switch
              value={isCreditCard}
              onValueChange={setIsCreditCard}
              trackColor={{ false: '#CBD5E0', true: '#4A6FA5' }}
              thumbColor={isCreditCard ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>

          {error && <Text style={styles.errorText}>{error}</Text>}

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            <Text style={styles.submitButtonText}>Create Transaction</Text>
          </TouchableOpacity>
        </View>
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
  },
  form: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4A5568',
    marginBottom: 8,
    fontFamily: 'Inter-Medium',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  currencySymbol: {
    fontSize: 24,
    color: '#4A5568',
    paddingRight: 8,
    fontFamily: 'Inter-Regular',
  },
  amountInput: {
    flex: 1,
    fontSize: 24,
    padding: 12,
    color: '#2D3748',
    fontFamily: 'Inter-Regular',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#CBD5E0',
    borderRadius: 8,
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
  },
  picker: {
    height: 50,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  switchLabel: {
    fontSize: 16,
    color: '#4A5568',
    fontFamily: 'Inter-Regular',
  },
  errorText: {
    color: '#E53E3E',
    marginBottom: 16,
    fontFamily: 'Inter-Regular',
  },
  submitButton: {
    backgroundColor: '#4A6FA5',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter-Medium',
  },
});