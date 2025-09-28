
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { colors, commonStyles } from '@/styles/commonStyles';
import { FinancialGoal } from '@/types/finance';

export function FinancialGoals() {
  // Mock data - in a real app, this would come from state management
  const goals: FinancialGoal[] = [
    {
      id: '1',
      title: 'Emergency Fund',
      description: 'Build 6 months of expenses',
      targetAmount: 10000,
      currentAmount: 3500,
      targetDate: new Date('2024-12-31'),
      category: 'savings',
      emoji: '🛡️',
    },
    {
      id: '2',
      title: 'Vacation to Japan',
      description: 'Save for dream trip',
      targetAmount: 5000,
      currentAmount: 1200,
      targetDate: new Date('2024-08-15'),
      category: 'purchase',
      emoji: '🗾',
    },
  ];

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <View style={commonStyles.section}>
      <View style={[commonStyles.row, { marginBottom: 12 }]}>
        <Text style={commonStyles.sectionTitle}>Financial Goals</Text>
        <Pressable onPress={() => {
          console.log('View all goals');
          // router.push('/goals');
        }}>
          <Text style={styles.viewAllText}>View All</Text>
        </Pressable>
      </View>
      
      {goals.map((goal) => {
        const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
        return (
          <View key={goal.id} style={commonStyles.cardSmall}>
            <View style={styles.goalHeader}>
              <View style={styles.goalLeft}>
                <Text style={styles.goalEmoji}>{goal.emoji}</Text>
                <View style={styles.goalDetails}>
                  <Text style={styles.goalTitle}>{goal.title}</Text>
                  <Text style={styles.goalDescription}>{goal.description}</Text>
                </View>
              </View>
              <Text style={styles.goalAmount}>
                ${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}
              </Text>
            </View>
            
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${progress}%` }]} />
              </View>
              <Text style={styles.progressText}>{progress.toFixed(0)}%</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  viewAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  goalLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  goalEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  goalDetails: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  goalDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  goalAmount: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: colors.grey,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.success,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSecondary,
    minWidth: 32,
    textAlign: 'right',
  },
});
