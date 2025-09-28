
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { IconSymbol } from './IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';

export function QuickActions() {
  const actions = [
    {
      title: 'Add Expense',
      icon: 'minus.circle',
      color: colors.expense,
      route: '/add-transaction?type=expense',
    },
    {
      title: 'Add Income',
      icon: 'plus.circle',
      color: colors.income,
      route: '/add-transaction?type=income',
    },
    {
      title: 'Transfer',
      icon: 'arrow.left.arrow.right',
      color: colors.primary,
      route: '/transfer',
    },
    {
      title: 'Budget',
      icon: 'chart.pie',
      color: colors.warning,
      route: '/budget',
    },
  ];

  const handleActionPress = (route: string) => {
    console.log(`Navigating to: ${route}`);
    try {
      router.push(route as any);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <View style={commonStyles.section}>
      <Text style={commonStyles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsGrid}>
        {actions.map((action, index) => (
          <Pressable
            key={index}
            style={styles.actionButton}
            onPress={() => handleActionPress(action.route)}
          >
            <View style={[styles.actionIcon, { backgroundColor: `${action.color}20` }]}>
              <IconSymbol name={action.icon as any} color={action.color} size={24} />
            </View>
            <Text style={styles.actionTitle}>{action.title}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.grey,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text,
    textAlign: 'center',
  },
});
