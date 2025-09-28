
import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, StyleSheet, Alert } from 'react-native';
import { Stack, router } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { Button } from '@/components/button';
import { colors, commonStyles } from '@/styles/commonStyles';
import { Budget } from '@/types/finance';

const budgetCategories = [
  { name: 'Food & Dining', emoji: '🍽️', color: colors.expense },
  { name: 'Transportation', emoji: '🚗', color: colors.expense },
  { name: 'Shopping', emoji: '🛍️', color: colors.expense },
  { name: 'Entertainment', emoji: '🎬', color: colors.expense },
  { name: 'Bills & Utilities', emoji: '💡', color: colors.expense },
  { name: 'Healthcare', emoji: '🏥', color: colors.expense },
  { name: 'Education', emoji: '📚', color: colors.expense },
  { name: 'Savings', emoji: '💰', color: colors.income },
  { name: 'Other', emoji: '📦', color: colors.expense },
];

const periods = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
];

export default function BudgetScreen() {
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(budgetCategories[0]);
  const [selectedPeriod, setSelectedPeriod] = useState(periods[1]); // Default to monthly
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!amount) {
      Alert.alert('Error', 'Please enter a budget amount');
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    setLoading(true);
    
    try {
      const newBudget: Budget = {
        id: Date.now().toString(),
        category: selectedCategory.name,
        allocated: numAmount,
        spent: 0,
        period: selectedPeriod.value as 'weekly' | 'monthly' | 'yearly',
        emoji: selectedCategory.emoji,
      };

      console.log('Saving budget:', newBudget);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      Alert.alert(
        'Success', 
        'Budget created successfully!',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    } catch (error) {
      console.error('Error saving budget:', error);
      Alert.alert('Error', 'Failed to create budget. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={commonStyles.container}>
      <Stack.Screen
        options={{
          title: 'Create Budget',
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={styles.headerButton}>
              <IconSymbol name="chevron.left" color={colors.primary} size={24} />
            </Pressable>
          ),
        }}
      />
      
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.amountSection}>
          <Text style={styles.amountLabel}>Budget Amount</Text>
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
          <Text style={styles.periodLabel}>per {selectedPeriod.label.toLowerCase()}</Text>
        </View>

        <View style={commonStyles.section}>
          <Text style={commonStyles.sectionTitle}>Budget Period</Text>
          <View style={styles.periodsContainer}>
            {periods.map((period, index) => (
              <Pressable
                key={index}
                style={[
                  styles.periodButton,
                  selectedPeriod.value === period.value && styles.periodButtonSelected
                ]}
                onPress={() => setSelectedPeriod(period)}
              >
                <Text style={[
                  styles.periodText,
                  selectedPeriod.value === period.value && styles.periodTextSelected
                ]}>
                  {period.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={commonStyles.section}>
          <Text style={commonStyles.sectionTitle}>Category</Text>
          <View style={styles.categoriesGrid}>
            {budgetCategories.map((category, index) => (
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

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Budget Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Category:</Text>
            <Text style={styles.summaryValue}>{selectedCategory.emoji} {selectedCategory.name}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Amount:</Text>
            <Text style={styles.summaryValue}>${amount || '0.00'}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Period:</Text>
            <Text style={styles.summaryValue}>{selectedPeriod.label}</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            onPress={handleSave}
            loading={loading}
            disabled={loading}
            style={styles.saveButton}
          >
            Create Budget
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
  periodLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
    marginTop: 8,
  },
  periodsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  periodButton: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.grey,
    alignItems: 'center',
  },
  periodButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  periodText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  periodTextSelected: {
    color: colors.background,
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
  summaryCard: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.grey,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  buttonContainer: {
    paddingVertical: 24,
  },
  saveButton: {
    backgroundColor: colors.primary,
  },
});
