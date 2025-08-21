import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { colors } from '../constants/colors';
import { categories } from '../constants/categories';
import { StorageService } from '../utils/storage';
import { formatCurrency, calculateBalance, formatDate } from '../utils/helpers';
import i18n from '../locales';
import { homeStyles as styles } from '../constants/styles';

const HomeScreen = ({ onAddExpense }) => {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const data = await StorageService.getTransactions();
      setTransactions(data);
      setBalance(calculateBalance(data));
    } catch (error) {
      console.error('Error loading transactions:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTransactions();
    setRefreshing(false);
  };

  const handleDelete = (id) => {
    Alert.alert(
      i18n.t('delete'),
      i18n.t('confirmDelete'),
      [
        { text: i18n.t('cancel'), style: 'cancel' },
        {
          text: i18n.t('delete'),
          style: 'destructive',
          onPress: async () => {
            try {
              await StorageService.deleteTransaction(id);
              await loadTransactions();
            } catch (error) {
              console.error('Error deleting transaction:', error);
            }
          },
        },
      ]
    );
  };

  const getCategoryInfo = (categoryId, type) => {
    const categoryList = categories[type];
    return categoryList.find(c => c.id === categoryId) || categoryList[categoryList.length - 1];
  };

  const renderTransaction = ({ item }) => {
    const categoryInfo = getCategoryInfo(item.category, item.type);
    const isIncome = item.type === 'income';
    
    return (
      <TouchableOpacity
        style={styles.transactionCard}
        onLongPress={() => handleDelete(item.id)}
      >
        <View style={styles.transactionLeft}>
          <View style={[styles.iconContainer, { backgroundColor: categoryInfo.color + '20' }]}>
            <Icon name={categoryInfo.icon} size={24} color={categoryInfo.color} />
          </View>
          <View style={styles.transactionInfo}>
            <Text style={styles.transactionCategory}>
              {i18n.t(categoryInfo.name)}
            </Text>
            <Text style={styles.transactionDescription}>
              {item.description || formatDate(item.date)}
            </Text>
          </View>
        </View>
        <Text style={[
          styles.transactionAmount,
          { color: isIncome ? colors.success : colors.error }
        ]}>
          {isIncome ? '+' : '-'} {formatCurrency(item.amount)}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>{i18n.t('balance')}</Text>
        <Text style={styles.balanceAmount}>{formatCurrency(balance)}</Text>
      </View>

      {/* Transactions List */}
      {transactions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="wallet-outline" size={64} color={colors.gray400} />
          <Text style={styles.emptyText}>{i18n.t('noTransactions')}</Text>
          <Text style={styles.emptySubtext}>{i18n.t('addYourFirst')}</Text>
        </View>
      ) : (
        <FlatList
          data={transactions}
          renderItem={renderTransaction}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={onAddExpense}
      >
        <Icon name="add" size={28} color={colors.gray900} />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;