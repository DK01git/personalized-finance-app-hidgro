import React, { useState, useEffect } from "react";
import { Stack, router } from "expo-router";
import { ScrollView, Pressable, StyleSheet, View, Text } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles } from "@/styles/commonStyles";
import { DashboardCard } from "@/components/DashboardCard";
import { QuickActions } from "@/components/QuickActions";
import { RecentTransactions } from "@/components/RecentTransactions";
import { FinancialGoals } from "@/components/FinancialGoals";

export default function HomeScreen() {
  const [totalBalance, setTotalBalance] = useState(2450.75);
  const [monthlyIncome, setMonthlyIncome] = useState(3200.00);
  const [monthlyExpenses, setMonthlyExpenses] = useState(1850.25);

  const renderHeaderRight = () => (
    <Pressable
      onPress={() => router.push("/add-transaction")}
      style={styles.headerButton}
    >
      <IconSymbol name="plus" color={colors.primary} size={24} />
    </Pressable>
  );

  const renderHeaderLeft = () => (
    <Pressable
      onPress={() => router.push("/profile")}
      style={styles.headerButton}
    >
      <IconSymbol name="person.circle" color={colors.primary} size={24} />
    </Pressable>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "FinanceFlow",
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitleStyle: {
            color: colors.text,
            fontWeight: '700',
          },
          headerRight: renderHeaderRight,
          headerLeft: renderHeaderLeft,
        }}
      />
      <ScrollView style={[commonStyles.container]} showsVerticalScrollIndicator={false}>
        <View style={commonStyles.content}>
          
          {/* Welcome Section */}
          <View style={styles.welcomeSection}>
            <Text style={commonStyles.title}>Welcome back!</Text>
            <Text style={commonStyles.subtitle}>Here&apos;s your financial overview</Text>
          </View>

          {/* Balance Overview */}
          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Total Balance</Text>
            <Text style={styles.balanceAmount}>${totalBalance.toFixed(2)}</Text>
            <View style={styles.balanceRow}>
              <View style={styles.balanceItem}>
                <Text style={[styles.balanceSubAmount, { color: colors.income }]}>
                  +${monthlyIncome.toFixed(2)}
                </Text>
                <Text style={styles.balanceSubLabel}>Income</Text>
              </View>
              <View style={styles.balanceItem}>
                <Text style={[styles.balanceSubAmount, { color: colors.expense }]}>
                  -${monthlyExpenses.toFixed(2)}
                </Text>
                <Text style={styles.balanceSubLabel}>Expenses</Text>
              </View>
            </View>
          </View>

          {/* Quick Actions */}
          <QuickActions />

          {/* Dashboard Cards */}
          <View style={styles.cardsGrid}>
            <DashboardCard
              title="Budget Status"
              value="78%"
              subtitle="of monthly budget used"
              icon="chart.pie"
              color={colors.warning}
              onPress={() => router.push("/budget")}
            />
            <DashboardCard
              title="Savings Goal"
              value="$1,200"
              subtitle="Emergency fund progress"
              icon="target"
              color={colors.success}
              onPress={() => router.push("/goals")}
            />
          </View>

          {/* Financial Goals */}
          <FinancialGoals />

          {/* Recent Transactions */}
          <RecentTransactions />

        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  welcomeSection: {
    paddingTop: 20,
    paddingBottom: 16,
  },
  balanceCard: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: 'white',
    marginBottom: 20,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  balanceItem: {
    alignItems: 'center',
  },
  balanceSubAmount: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  balanceSubLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  cardsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
  },
  headerButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.backgroundAlt,
  },
});
