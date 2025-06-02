import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Switch,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Bucket } from '../types/models';
import { CreditCard, Check, X } from 'lucide-react-native';
import { useBuckets } from '../hooks/useStorage';

interface AddTransactionModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: {
    amount: number;
    bucketName: string;
    isCreditCard: boolean;
    timestamp: Date;
  }) => void;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  visible,
  onClose,
  onSave
}) => {
  const [amount, setAmount] = useState('');
  const [selectedBucket, setSelectedBucket] = useState<string>('');
  const [isCreditCard, setIsCreditCard] = useState(false);
  const { buckets, loading } = useBuckets();

  useEffect(() => {
    if (buckets.length > 0 && !selectedBucket) {
      setSelectedBucket(buckets[0].name);
    }
  }, [buckets, selectedBucket]);

  const handleSave = () => {
    if (!amount || !selectedBucket) return;

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) return;

    onSave({
      amount: parsedAmount,
      bucketName: selectedBucket,
      isCreditCard,
      timestamp: new Date()
    });

    // Reset form
    setAmount('');
    setIsCreditCard(false);
    if (buckets.length > 0) {
      setSelectedBucket(buckets[0].name);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>New Transaction</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color="#4A5568" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.formContainer}>
            <Text style={styles.label}>Amount</Text>
            <View style={styles.amountInputContainer}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="0.00"
                keyboardType="decimal-pad"
                value={amount}
                onChangeText={setAmount}
                autoFocus
              />
            </View>

            <Text style={styles.label}>Bucket</Text>
            <View style={styles.bucketContainer}>
              {buckets.map((bucket) => (
                <TouchableOpacity
                  key={bucket.id}
                  style={[
                    styles.bucketOption,
                    selectedBucket === bucket.name && styles.selectedBucket
                  ]}
                  onPress={() => setSelectedBucket(bucket.name)}
                >
                  <Text
                    style={[
                      styles.bucketText,
                      selectedBucket === bucket.name && styles.selectedBucketText
                    ]}
                  >
                    {bucket.name}
                  </Text>
                  {selectedBucket === bucket.name && (
                    <Check size={16} color="#FFFFFF" />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.creditCardContainer}>
              <View style={styles.creditCardTextContainer}>
                <CreditCard size={20} color="#4A5568" />
                <Text style={styles.creditCardText}>Credit Card</Text>
              </View>
              <Switch
                value={isCreditCard}
                onValueChange={setIsCreditCard}
                trackColor={{ false: '#CBD5E0', true: '#6A7FDB' }}
                thumbColor={isCreditCard ? '#FFFFFF' : '#FFFFFF'}
              />
            </View>
          </ScrollView>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.saveButton,
                (!amount || !selectedBucket) && styles.disabledButton
              ]}
              onPress={handleSave}
              disabled={!amount || !selectedBucket}
              activeOpacity={0.7}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: Platform.OS === 'ios' ? 34 : 24,
    height: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3748',
  },
  closeButton: {
    padding: 4,
  },
  formContainer: {
    padding: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4A5568',
    marginBottom: 8,
  },
  amountInputContainer: {
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
  },
  amountInput: {
    flex: 1,
    fontSize: 24,
    padding: 12,
  },
  bucketContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  bucketOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedBucket: {
    backgroundColor: '#6A7FDB',
  },
  bucketText: {
    fontSize: 14,
    color: '#4A5568',
    marginRight: 4,
  },
  selectedBucketText: {
    color: '#FFFFFF',
  },
  creditCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    marginBottom: 24,
  },
  creditCardTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  creditCardText: {
    fontSize: 16,
    color: '#4A5568',
    marginLeft: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  cancelButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    paddingVertical: 16,
    marginRight: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A5568',
  },
  saveButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6A7FDB',
    borderRadius: 12,
    paddingVertical: 16,
    marginLeft: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  disabledButton: {
    backgroundColor: '#CBD5E0',
  },
});

export default AddTransactionModal;