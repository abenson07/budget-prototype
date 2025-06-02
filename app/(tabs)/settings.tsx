import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView, Switch, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { StorageKeys } from '@/types/models';
import { 
  ChevronRight, 
  Info, 
  LogOut, 
  Moon, 
  Shield, 
  User,
  Wallet
} from 'lucide-react-native';

export default function SettingsScreen() {
  const router = useRouter();
  const [darkMode, setDarkMode] = React.useState(false);
  
  const handleResetData = async () => {
    Alert.alert(
      'Reset App Data',
      'Are you sure you want to reset all app data? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset', 
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.multiRemove([
                StorageKeys.BUCKETS,
                StorageKeys.TRANSACTIONS,
                StorageKeys.APP_STATE
              ]);
              Alert.alert(
                'Data Reset',
                'All data has been reset to defaults. Please restart the app.',
                [{ text: 'OK' }]
              );
            } catch (error) {
              console.error('Error resetting data:', error);
              Alert.alert('Error', 'Failed to reset data. Please try again.');
            }
          }
        }
      ]
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Moon size={20} color="#4A5568" style={styles.settingIcon} />
              <Text style={styles.settingText}>Dark Mode</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#CBD5E0', true: '#6A7FDB' }}
              thumbColor={darkMode ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <User size={20} color="#4A5568" style={styles.settingIcon} />
              <Text style={styles.settingText}>Profile</Text>
            </View>
            <ChevronRight size={20} color="#A0AEC0" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Shield size={20} color="#4A5568" style={styles.settingIcon} />
              <Text style={styles.settingText}>Privacy & Security</Text>
            </View>
            <ChevronRight size={20} color="#A0AEC0" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Wallet size={20} color="#4A5568" style={styles.settingIcon} />
              <Text style={styles.settingText}>Payment Methods</Text>
            </View>
            <ChevronRight size={20} color="#A0AEC0" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Info size={20} color="#4A5568" style={styles.settingIcon} />
              <Text style={styles.settingText}>App Information</Text>
            </View>
            <ChevronRight size={20} color="#A0AEC0" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <TouchableOpacity 
            style={[styles.settingItem, styles.dangerItem]}
            onPress={handleResetData}
          >
            <View style={styles.settingInfo}>
              <LogOut size={20} color="#E53E3E" style={styles.settingIcon} />
              <Text style={[styles.settingText, styles.dangerText]}>Reset App Data</Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Budget Flow v1.0.0</Text>
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
    fontSize: 22,
    fontWeight: '700',
    color: '#2D3748',
    fontFamily: 'Inter-Bold',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A5568',
    marginHorizontal: 16,
    marginBottom: 8,
    marginTop: 24,
    fontFamily: 'Inter-Medium',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 12,
  },
  settingText: {
    fontSize: 16,
    color: '#2D3748',
    fontFamily: 'Inter-Regular',
  },
  dangerItem: {
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  dangerText: {
    color: '#E53E3E',
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  versionText: {
    fontSize: 14,
    color: '#A0AEC0',
    fontFamily: 'Inter-Regular',
  },
});