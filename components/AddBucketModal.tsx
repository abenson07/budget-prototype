import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { BucketType } from '../types/models';
import { Check, X } from 'lucide-react-native';

interface AddBucketModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: {
    name: string;
    type: BucketType;
    target: number;
    balance: number;
  }) => void;
}

const AddBucketModal: React.FC<AddBucketModalProps> = ({
  visible,
  onClose,
  onSave
}) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<BucketType>('safe');
  const [target, setTarget] = useState('');
  const [balance, setBalance] = useState('');

  const handleSave = () => {
    if (!name || !target) return;

    const parsedTarget = parseFloat(target);
    const parsedBalance = parseFloat(balance || '0');
    
    if (isNaN(parsedTarget) || isNaN(parsedBalance)) return;

    onSave({
      name,
      type,
      target: parsedTarget,
      balance: parsedBalance
    });

    // Reset form
    setName('');
    setType('safe');
    setTarget('');
    setBalance('');
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
            <Text style={styles.modalTitle}>New Budget Bucket</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color="#4A5568" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.formContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Bucket name"
              value={name}
              onChangeText={setName}
              autoFocus
            />

            <Text style={styles.label}>Type</Text>
            <View style={styles.typeContainer}>
              <TouchableOpacity
                style={[
                  styles.typeOption,
                  type === 'safe' && styles.selectedType
                ]}
                onPress={() => setType('safe')}
              >
                <Text
                  style={[
                    styles.typeText,
                    type === 'safe' && styles.selectedTypeText
                  ]}
                >
                  Safe
                </Text>
                {type === 'safe' && (
                  <Check size={16} color="#FFFFFF" />
                )}
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.typeOption,
                  type === 'discretionary' && styles.selectedType
                ]}
                onPress={() => setType('discretionary')}
              >
                <Text
                  style={[
                    styles.typeText,
                    type === 'discretionary' && styles.selectedTypeText
                  ]}
                >
                  Discretionary
                </Text>
                {type === 'discretionary' && (
                  <Check size={16} color="#FFFFFF" />
                )}
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Target Amount</Text>
            <View style={styles.amountInputContainer}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="0.00"
                keyboardType="decimal-pad"
                value={target}
                onChangeText={setTarget}
              />
            </View>

            <Text style={styles.label}>Initial Balance (Optional)</Text>
            <View style={styles.amountInputContainer}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="0.00"
                keyboardType="decimal-pad"
                value={balance}
                onChangeText={setBalance}
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
                (!name || !target) && styles.disabledButton
              ]}
              onPress={handleSave}
              disabled={!name || !target}
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
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 24,
  },
  typeContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  typeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  selectedType: {
    backgroundColor: '#6A7FDB',
  },
  typeText: {
    fontSize: 14,
    color: '#4A5568',
    marginRight: 4,
  },
  selectedTypeText: {
    color: '#FFFFFF',
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

export default AddBucketModal;