
export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  type: 'income' | 'expense';
  date: Date;
  emoji?: string;
  tags?: string[];
}

export interface Budget {
  id: string;
  category: string;
  allocated: number;
  spent: number;
  period: 'weekly' | 'monthly' | 'yearly';
  emoji?: string;
}

export interface FinancialGoal {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: Date;
  category: 'savings' | 'debt' | 'investment' | 'purchase';
  emoji?: string;
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
  color: string;
  type: 'income' | 'expense';
  isCustom: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  currency: string;
  monthlyIncome?: number;
  budgetCategories: string[];
  financialGoals: string[];
  preferences: {
    notifications: boolean;
    darkMode: boolean;
    language: string;
  };
}

export interface Insight {
  id: string;
  type: 'warning' | 'tip' | 'achievement';
  title: string;
  message: string;
  actionText?: string;
  actionRoute?: string;
  date: Date;
}
