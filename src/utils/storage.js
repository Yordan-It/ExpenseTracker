/**
 * @fileoverview Storage Service for ExpenseTracker Application
 * @description Provides abstraction layer for AsyncStorage operations including
 * transaction management, settings persistence, and data validation.
 * 
 * @author Yordan Iturra
 * @version 1.0.0
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

/** @constant {string} Storage key for transactions data */
const TRANSACTIONS_KEY = '@ExpenseTracker:transactions';

/** @constant {string} Storage key for application settings */
const SETTINGS_KEY = '@ExpenseTracker:settings';

/**
 * Storage Service
 * 
 * @description Centralized service for handling all data persistence operations
 * using AsyncStorage. Provides methods for CRUD operations on transactions
 * and application settings with proper error handling.
 * 
 * @namespace StorageService
 */
export const StorageService = {
  /**
   * Retrieves all transactions from storage
   * 
   * @async
   * @function getTransactions
   * @returns {Promise<Array<Object>>} Array of transaction objects
   * @throws {Error} When storage access fails
   * 
   * @example
   * ```javascript
   * const transactions = await StorageService.getTransactions();
   * console.log('Total transactions:', transactions.length);
   * ```
   */
  async getTransactions() {
    try {
      const data = await AsyncStorage.getItem(TRANSACTIONS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading transactions:', error);
      return [];
    }
  },

  async saveTransaction(transaction) {
    try {
      const transactions = await this.getTransactions();
      const newTransaction = {
        ...transaction,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      transactions.unshift(newTransaction);
      await AsyncStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
      return newTransaction;
    } catch (error) {
      console.error('Error saving transaction:', error);
      throw error;
    }
  },

  async updateTransaction(id, updates) {
    try {
      const transactions = await this.getTransactions();
      const index = transactions.findIndex(t => t.id === id);
      if (index !== -1) {
        transactions[index] = { ...transactions[index], ...updates };
        await AsyncStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
        return transactions[index];
      }
      throw new Error('Transaction not found');
    } catch (error) {
      console.error('Error updating transaction:', error);
      throw error;
    }
  },

  async deleteTransaction(id) {
    try {
      const transactions = await this.getTransactions();
      const filtered = transactions.filter(t => t.id !== id);
      await AsyncStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error('Error deleting transaction:', error);
      throw error;
    }
  },

  async getSettings() {
    try {
      const data = await AsyncStorage.getItem(SETTINGS_KEY);
      return data ? JSON.parse(data) : { language: 'en', currency: 'USD' };
    } catch (error) {
      console.error('Error loading settings:', error);
      return { language: 'en', currency: 'USD' };
    }
  },

  async saveSettings(settings) {
    try {
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
      return settings;
    } catch (error) {
      console.error('Error saving settings:', error);
      throw error;
    }
  },
  
  async clearAll() {
    try {
      await AsyncStorage.multiRemove([TRANSACTIONS_KEY, SETTINGS_KEY]);
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  },
};