import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import { PieChart, LineChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../constants/colors';
import { categories } from '../constants/categories';
import { StorageService } from '../utils/storage';
import {
  formatCurrency,
  calculateTotalByType,
  groupTransactionsByCategory,
  getThisMonthTransactions,
  getLastMonthTransactions,
} from '../utils/helpers';
import i18n from '../locales';
import { statsStyles as styles } from '../constants/styles';

const screenWidth = Dimensions.get('window').width;

const StatsScreen = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [categoryData, setCategoryData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('thisMonth');

  useEffect(() => {
    loadStats();
  }, [selectedPeriod]);

  const loadStats = async () => {
    try {
      const allTransactions = await StorageService.getTransactions();
      let filteredTransactions = allTransactions;

      if (selectedPeriod === 'thisMonth') {
        filteredTransactions = getThisMonthTransactions(allTransactions);
      } else if (selectedPeriod === 'lastMonth') {
        filteredTransactions = getLastMonthTransactions(allTransactions);
      }

      setTransactions(filteredTransactions);
      setTotalIncome(calculateTotalByType(filteredTransactions, 'income'));
      setTotalExpenses(calculateTotalByType(filteredTransactions, 'expense'));

      // Prepare category data for pie chart
      const expenseTransactions = filteredTransactions.filter(t => t.type === 'expense');
      const grouped = groupTransactionsByCategory(expenseTransactions);
      
      const pieData = grouped.map((group, index) => {
        const categoryInfo = categories.expense.find(c => c.id === group.name) || categories.expense[0];
        return {
          name: i18n.t(categoryInfo.name),
          amount: group.total,
          color: categoryInfo.color,
          legendFontColor: colors.gray300,
          legendFontSize: 12,
        };
      });
      
      setCategoryData(pieData);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const chartConfig = {
    backgroundGradientFrom: colors.gray900,
    backgroundGradientTo: colors.gray800,
    color: (opacity = 1) => `rgba(212, 175, 55, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  return (
    <ScrollView style={styles.container}>
      {/* Period Selector */}
      <View style={styles.periodContainer}>
        <TouchableOpacity
          style={[styles.periodButton, selectedPeriod === 'thisMonth' && styles.periodButtonActive]}
          onPress={() => setSelectedPeriod('thisMonth')}
        >
          <Text style={[styles.periodText, selectedPeriod === 'thisMonth' && styles.periodTextActive]}>
            {i18n.t('thisMonth')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.periodButton, selectedPeriod === 'lastMonth' && styles.periodButtonActive]}
          onPress={() => setSelectedPeriod('lastMonth')}
        >
          <Text style={[styles.periodText, selectedPeriod === 'lastMonth' && styles.periodTextActive]}>
            {i18n.t('lastMonth')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.periodButton, selectedPeriod === 'thisYear' && styles.periodButtonActive]}
          onPress={() => setSelectedPeriod('thisYear')}
        >
          <Text style={[styles.periodText, selectedPeriod === 'thisYear' && styles.periodTextActive]}>
            {i18n.t('thisYear')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Summary Cards */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Icon name="trending-up" size={24} color={colors.success} />
          <Text style={styles.summaryLabel}>{i18n.t('totalIncome')}</Text>
          <Text style={styles.summaryAmount}>{formatCurrency(totalIncome)}</Text>
        </View>
        <View style={styles.summaryCard}>
          <Icon name="trending-down" size={24} color={colors.error} />
          <Text style={styles.summaryLabel}>{i18n.t('totalExpenses')}</Text>
          <Text style={styles.summaryAmount}>{formatCurrency(totalExpenses)}</Text>
        </View>
      </View>

      {/* Balance */}
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>{i18n.t('balance')}</Text>
        <Text style={[
          styles.balanceAmount,
          { color: totalIncome - totalExpenses >= 0 ? colors.success : colors.error }
        ]}>
          {formatCurrency(totalIncome - totalExpenses)}
        </Text>
      </View>

      {/* Pie Chart */}
      {categoryData.length > 0 && (
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Expenses by Category</Text>
          <PieChart
            data={categoryData}
            width={screenWidth - 32}
            height={220}
            chartConfig={chartConfig}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>
      )}
    </ScrollView>
  );
};

export default StatsScreen;