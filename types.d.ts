/**
 * @fileoverview TypeScript type definitions for ExpenseTracker
 * @description Provides type safety and better development experience
 * 
 * @author ExpenseTracker Team
 * @version 1.0.0
 */

declare module 'ExpenseTracker' {
  /**
   * Transaction type definition
   */
  export interface Transaction {
    /** Unique identifier for the transaction */
    id: string;
    
    /** Type of transaction */
    type: 'income' | 'expense';
    
    /** Transaction amount in dollars */
    amount: number;
    
    /** User-provided description */
    description: string;
    
    /** Category identifier */
    category: string;
    
    /** Transaction date in ISO string format */
    date: string;
    
    /** Creation timestamp in ISO string format */
    createdAt: string;
  }

  /**
   * Category definition
   */
  export interface Category {
    /** Unique category identifier */
    id: string;
    
    /** Category display name key for i18n */
    name: string;
    
    /** Icon name from react-native-vector-icons */
    icon: string;
    
    /** Category color hex code */
    color: string;
    
    /** Category type */
    type: 'income' | 'expense';
  }

  /**
   * Application settings
   */
  export interface AppSettings {
    /** Selected language code */
    language: 'en' | 'es';
    
    /** Selected currency code */
    currency: 'USD' | 'EUR' | 'GBP';
    
    /** Theme preference */
    theme?: 'light' | 'dark' | 'auto';
  }

  /**
   * Validation result for forms
   */
  export interface ValidationResult {
    /** Whether validation passed */
    isValid: boolean;
    
    /** Validation error messages */
    errors: {
      amount?: string;
      description?: string;
      category?: string;
      date?: string;
    };
  }

  /**
   * Statistics data structure
   */
  export interface Statistics {
    /** Total income amount */
    totalIncome: number;
    
    /** Total expense amount */
    totalExpenses: number;
    
    /** Current balance (income - expenses) */
    balance: number;
    
    /** Number of transactions */
    transactionCount: number;
    
    /** Category breakdown */
    categoryBreakdown: {
      [categoryId: string]: {
        total: number;
        count: number;
        percentage: number;
      };
    };
  }

  /**
   * Navigation props for screens
   */
  export interface NavigationProps {
    /** Function to navigate to specific screen */
    navigate: (screen: string) => void;
    
    /** Function to go back */
    goBack: () => void;
    
    /** Current route information */
    route: {
      name: string;
      params?: Record<string, any>;
    };
  }

  /**
   * Color palette type
   */
  export interface ColorPalette {
    primary: string;
    gold: string;
    gray900: string;
    gray800: string;
    gray700: string;
    gray600: string;
    gray500: string;
    gray400: string;
    gray300: string;
    white: string;
    black: string;
    success: string;
    error: string;
    warning: string;
    info: string;
    income: string;
    expense: string;
  }

  /**
   * Storage service interface
   */
  export interface IStorageService {
    getTransactions(): Promise<Transaction[]>;
    saveTransaction(transaction: Omit<Transaction, 'id' | 'createdAt'>): Promise<Transaction>;
    updateTransaction(id: string, updates: Partial<Transaction>): Promise<Transaction>;
    deleteTransaction(id: string): Promise<boolean>;
    getSettings(): Promise<AppSettings>;
    saveSettings(settings: AppSettings): Promise<AppSettings>;
    clearAll(): Promise<boolean>;
  }

  /**
   * Component props for AddExpenseScreen
   */
  export interface AddExpenseScreenProps {
    /** Callback when user closes the screen */
    onClose: () => void;
    
    /** Callback when user successfully saves a transaction */
    onSave: () => void;
    
    /** Optional transaction to edit */
    transaction?: Transaction;
  }

  /**
   * Component props for HomeScreen
   */
  export interface HomeScreenProps {
    /** Callback when user wants to add a new expense */
    onAddExpense: () => void;
    
    /** Optional navigation props */
    navigation?: NavigationProps;
  }

  /**
   * Component props for StatsScreen
   */
  export interface StatsScreenProps {
    /** Optional navigation props */
    navigation?: NavigationProps;
  }

  /**
   * Date filter options for transactions
   */
  export type DateFilter = 'all' | 'today' | 'week' | 'month' | 'year' | 'custom';

  /**
   * Sort options for transaction lists
   */
  export type SortOption = 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc' | 'category';

  /**
   * Screen names for navigation
   */
  export type ScreenName = 'home' | 'stats' | 'add-expense' | 'settings';

  /**
   * Localization function type
   */
  export type TranslationFunction = (key: string, options?: Record<string, any>) => string;
}

/**
 * Global type augmentations
 */
declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined;
      Stats: undefined;
      AddExpense: {
        transaction?: Transaction;
      };
      Settings: undefined;
    }
  }
}

export {};

