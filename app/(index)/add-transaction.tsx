
import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, StyleSheet, Alert } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { Button } from '@/components/button';
import { colors, commonStyles } from '@/styles/commonStyles';
import { Transaction } from '@/types/finance';

const categories = {
  expense: [
    { name: 'Food & Dining', emoji: '🍽️', color: colors.expense },
    { name: 'Transportation', emoji: '🚗', color: colors.expense },
    { name: 'Shopping', emoji: '🛍️', color: colors.expense },
    { name: 'Entertainment', emoji: '🎬', color: colors.expense },
    { name: 'Bills & Utilities', emoji: '💡', color: colors.expense },
    { name: 'Healthcare', emoji: '🏥', color: colors.expense },
    { name: 'Education', emoji: '📚', color: colors.expense },
    { name: 'Other', emoji: '📦', color: colors.expense },
  ],
  income: [
    { name: 'Salary', emoji: '💼', color: colors.income },
    { name: 'Freelance', emoji: '💻', color: colors.income },
    { name: 'Investment', emoji: '📈', color: colors.income },
    { name: 'Gift', emoji: '🎁', color: colors.income },
    { name: 'Refund', emoji: '💰', color: colors.income },
    { name: 'Other', emoji: '📦', color: colors.income },
  ],
};

export default function AddTransactionScreen() {
  const { type } = useLocalSearchParams<{ type: 'income' | 'expense' }>();
  const transactionType = type || 'expense';
  
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[transactionType][0]);
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

    setLoading(true);
    
    try {
      // Here you would typically save to your data store
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        amount: numAmount,
        description,
        category: selectedCategory.name,
        type: transactionType,
        date: new Date(),
        emoji: selectedCategory.emoji,
      };

      console.log('Saving transaction:', newTransaction);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      Alert.alert(
        'Success', 
        `${transactionType === 'income' ? 'Income' : 'Expense'} added successfully!`,
        [{ text: 'OK', onPress: () => router.back() }]
      );
    } catch (error) {
      console.error('Error saving transaction:', error);
      Alert.alert('Error', 'Failed to save transaction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={commonStyles.container}>
      <Stack.Screen
        options={{
          title: `Add ${transactionType === 'income' ? 'Income' : 'Expense'}`,
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={styles.headerButton}>
              <IconSymbol name="chevron.left" color={colors.primary} size={24} />
            </Pressable>
          ),
        }}
      />
      
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.amountSection}>
          <Text style={styles.amountLabel}>Amount</Text>
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
          <Text style={commonStyles.sectionTitle}>Description</Text>
          <TextInput
            style={styles.descriptionInput}
            value={description}
            onChangeText={setDescription}
            placeholder={`What was this ${transactionType} for?`}
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={commonStyles.section}>
          <Text style={commonStyles.sectionTitle}>Category</Text>
          <View style={styles.categoriesGrid}>
            {categories[transactionType].map((category, index) => (
              <Pressable
                key={index}
                style={[
                  styles.categoryButton,
                  selectedCategory.name === category.name && styles.categoryButtonSelected
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                <Text style={[
                  styles.categoryText,
                  selectedCategory.name === category.name && styles.categoryTextSelected
                ]}>
                  {category.name}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            onPress={handleSave}
            loading={loading}
            disabled={loading}
            style={styles.saveButton}
          >
            Save {transactionType === 'income' ? 'Income' : 'Expense'}
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
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.grey,
    minWidth: '45%',
  },
  categoryButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    flex: 1,
  },
  categoryTextSelected: {
    color: colors.background,
  },
  buttonContainer: {
    paddingVertical: 24,
  },
  saveButton: {
    backgroundColor: colors.primary,
  },
});
