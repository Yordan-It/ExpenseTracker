/**
 * @fileoverview Helper utility functions for ExpenseTracker
 * @description Collection of pure functions for data formatting, calculations,
 * validation, and other common operations used throughout the application.
 * 
 * @author Yordan Iturra
 * @version 1.0.0
 */

/**
 * Formats a number as currency string
 * 
 * @function formatCurrency
 * @param {number} amount - The amount to format
 * @param {string} [currency='USD'] - Currency code (ISO 4217)
 * @returns {string} Formatted currency string
 * 
 * @example
 * ```javascript
 * formatCurrency(1234.56) // "$1,234.56"
 * formatCurrency(1234.56, 'EUR') // "€1,234.56"
 * ```
 */
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString();
};

export const formatDateLong = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const calculateBalance = (transactions) => {
  return transactions.reduce((acc, transaction) => {
    if (transaction.type === 'income') {
      return acc + parseFloat(transaction.amount);
    } else {
      return acc - parseFloat(transaction.amount);
    }
  }, 0);
};

export const calculateTotalByType = (transactions, type) => {
  return transactions
    .filter(t => t.type === type)
    .reduce((acc, t) => acc + parseFloat(t.amount), 0);
};

export const groupTransactionsByCategory = (transactions) => {
  const grouped = {};
  transactions.forEach(transaction => {
    const category = transaction.category;
    if (!grouped[category]) {
      grouped[category] = {
        name: category,
        total: 0,
        count: 0,
        transactions: [],
      };
    }
    grouped[category].total += parseFloat(transaction.amount);
    grouped[category].count += 1;
    grouped[category].transactions.push(transaction);
  });
  return Object.values(grouped);
};

export const filterTransactionsByDate = (transactions, startDate, endDate) => {
  return transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    return transactionDate >= startDate && transactionDate <= endDate;
  });
};

export const getThisMonthTransactions = (transactions) => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return filterTransactionsByDate(transactions, start, end);
};

export const getLastMonthTransactions = (transactions) => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const end = new Date(now.getFullYear(), now.getMonth(), 0);
  return filterTransactionsByDate(transactions, start, end);
};

export const validateTransaction = (transaction) => {
  const errors = {};
  
  if (!transaction.amount || parseFloat(transaction.amount) <= 0) {
    errors.amount = 'Amount must be greater than 0';
  }
  
  if (!transaction.category) {
    errors.category = 'Category is required';
  }
  
  if (!transaction.type) {
    errors.type = 'Type is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};