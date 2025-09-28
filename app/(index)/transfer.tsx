
import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, StyleSheet, Alert } from 'react-native';
import { Stack, router } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { Button } from '@/components/button';
import { colors, commonStyles } from '@/styles/commonStyles';

const accounts = [
  { id: '1', name: 'Checking Account', emoji: '🏦', balance: 2500.00 },
  { id: '2', name: 'Savings Account', emoji: '💰', balance: 8750.00 },
  { id: '3', name: 'Credit Card', emoji: '💳', balance: -450.00 },
  { id: '4', name: 'Cash', emoji: '💵', balance: 120.00 },
];

export default function TransferScreen() {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [fromAccount, setFromAccount] = useState(accounts[0]);
  const [toAccount, setToAccount] = useState(accounts[1]);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!amount || !description) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    if (fromAccount.id === toAccount.id) {
      Alert.alert('Error', 'Please select different accounts for transfer');
      return;
    }

    if (fromAccount.balance < numAmount) {
      Alert.alert('Error', 'Insufficient funds in source account');
      return;
    }

    setLoading(true);
    
    try {
      console.log('Processing transfer:', {
        amount: numAmount,
        from: fromAccount.name,
        to: toAccount.name,
        description,
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      Alert.alert(
        'Success', 
        'Transfer completed successfully!',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    } catch (error) {
      console.error('Error processing transfer:', error);
      Alert.alert('Error', 'Failed to process transfer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const swapAccounts = () => {
    const temp = fromAccount;
    setFromAccount(toAccount);
    setToAccount(temp);
  };

  return (
    <View style={commonStyles.container}>
      <Stack.Screen
        options={{
          title: 'Transfer Money',
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={styles.headerButton}>
              <IconSymbol name="chevron.left" color={colors.primary} size={24} />
            </Pressable>
          ),
        }}
      />
      
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.amountSection}>
          <Text style={styles.amountLabel}>Transfer Amount</Text>
          <View style={styles.amountInput}>
            <Text style={styles.currencySymbol}>$</Text>
            <TextInput
              style={styles.amountText}
              value={amount}
              onChangeText={setAmount}
              placeholder="0.00"
              keyboardType="numeric"
              autoFocus
            />
          </View>
        </View>

        <View style={commonStyles.section}>
          <Text style={commonStyles.sectionTitle}>From Account</Text>
          <View style={styles.accountsContainer}>
            {accounts.map((account) => (
              <Pressable
                key={account.id}
                style={[
                  styles.accountButton,
                  fromAccount.id === account.id && styles.accountButtonSelected
                ]}
                onPress={() => setFromAccount(account)}
              >
                <View style={styles.accountInfo}>
                  <Text style={styles.accountEmoji}>{account.emoji}</Text>
                  <View style={styles.accountDetails}>
                    <Text style={[
                      styles.accountName,
                      fromAccount.id === account.id && styles.accountNameSelected
                    ]}>
                      {account.name}
                    </Text>
                    <Text style={[
                      styles.accountBalance,
                      fromAccount.id === account.id && styles.accountBalanceSelected
                    ]}>
                      ${account.balance.toFixed(2)}
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.swapContainer}>
          <Pressable style={styles.swapButton} onPress={swapAccounts}>
            <IconSymbol name="arrow.up.arrow.down" color={colors.primary} size={24} />
          </Pressable>
        </View>

        <View style={commonStyles.section}>
          <Text style={commonStyles.sectionTitle}>To Account</Text>
          <View style={styles.accountsContainer}>
            {accounts.map((account) => (
              <Pressable
                key={account.id}
                style={[
                  styles.accountButton,
                  toAccount.id === account.id && styles.accountButtonSelected
                ]}
                onPress={() => setToAccount(account)}
              >
                <View style={styles.accountInfo}>
                  <Text style={styles.accountEmoji}>{account.emoji}</Text>
                  <View style={styles.accountDetails}>
                    <Text style={[
                      styles.accountName,
                      toAccount.id === account.id && styles.accountNameSelected
                    ]}>
                      {account.name}
                    </Text>
                    <Text style={[
                      styles.accountBalance,
                      toAccount.id === account.id && styles.accountBalanceSelected
                    ]}>
                      ${account.balance.toFixed(2)}
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={commonStyles.section}>
          <Text style={commonStyles.sectionTitle}>Description</Text>
          <TextInput
            style={styles.descriptionInput}
            value={description}
            onChangeText={setDescription}
            placeholder="What is this transfer for?"
            multiline
            numberOfLines={2}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            onPress={handleSave}
            loading={loading}
            disabled={loading}
            style={styles.transferButton}
          >
            Transfer Money
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    padding: 8,
    marginLeft: -8,
  },
  amountSection: {
    alignItems: 'center',
    paddingVertical: 32,
    marginBottom: 24,
  },
  amountLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: 12,
  },
  amountInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currencySymbol: {
    fontSize: 32,
    fontWeight: '600',
    color: colors.text,
    marginRight: 8,
  },
  amountText: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    minWidth: 120,
  },
  accountsContainer: {
    gap: 8,
  },
  accountButton: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.grey,
  },
  accountButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  accountDetails: {
    flex: 1,
  },
  accountName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  accountNameSelected: {
    color: colors.background,
  },
  accountBalance: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  accountBalanceSelected: {
    color: colors.background,
    opacity: 0.8,
  },
  swapContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  swapButton: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.grey,
  },
  descriptionInput: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.grey,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    paddingVertical: 24,
  },
  transferButton: {
    backgroundColor: colors.primary,
  },
});
