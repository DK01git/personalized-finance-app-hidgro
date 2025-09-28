
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { IconSymbol } from './IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { Transaction } from '@/types/finance';

export function RecentTransactions() {
  // Mock data - in a real app, this would come from state management
  const recentTransactions: Transaction[] = [
    {
      id: '1',
      amount: 45.50,
      description: 'Grocery Shopping',
      category: 'Food',
      type: 'expense',
      date: new Date(),
      emoji: '🛒',
    },
    {
      id: '2',
      amount: 3200.00,
      description: 'Salary',
      category: 'Income',
      type: 'income',
      date: new Date(Date.now() - 86400000),
      emoji: '💰',
    },
    {
      id: '3',
      amount: 12.99,
      description: 'Netflix Subscription',
      category: 'Entertainment',
      type: 'expense',
      date: new Date(Date.now() - 172800000),
      emoji: '🎬',
    },
  ];

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today.getTime() - 86400000);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <View style={commonStyles.section}>
      <View style={[commonStyles.row, { marginBottom: 12 }]}>
        <Text style={commonStyles.sectionTitle}>Recent Transactions</Text>
        <Pressable onPress={() => {
          console.log('View all transactions');
          // router.push('/transactions');
        }}>
          <Text style={styles.viewAllText}>View All</Text>
        </Pressable>
      </View>
      
      <View style={commonStyles.card}>
        {recentTransactions.map((transaction, index) => (
          <View key={transaction.id}>
            <View style={styles.transactionItem}>
              <View style={styles.transactionLeft}>
                <View style={styles.emojiContainer}>
                  <Text style={styles.emoji}>{transaction.emoji}</Text>
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionDescription}>
                    {transaction.description}
                  </Text>
                  <Text style={styles.transactionCategory}>
                    {transaction.category} • {formatDate(transaction.date)}
                  </Text>
                </View>
              </View>
              <Text style={[
                styles.transactionAmount,
                { color: transaction.type === 'income' ? colors.income : colors.expense }
              ]}>
                {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
              </Text>
            </View>
            {index < recentTransactions.length - 1 && <View style={styles.separator} />}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  emojiContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  emoji: {
    fontSize: 18,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 2,
  },
  transactionCategory: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  separator: {
    height: 1,
    backgroundColor: colors.grey,
    marginLeft: 52,
  },
});
