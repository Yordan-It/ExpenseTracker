import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const colors = {
  primary: '#4CAF50',
  background: '#F5F5F5',
  white: '#FFFFFF',
  text: '#333333',
  expense: '#F44336',
  income: '#4CAF50',
  gray: '#666666',
};

export default function SimpleApp() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [expenses, setExpenses] = useState([
    { id: 1, type: 'expense', amount: 50, description: 'Comida', category: 'Comida' },
    { id: 2, type: 'income', amount: 1000, description: 'Salario', category: 'Trabajo' },
  ]);

  const balance = expenses.reduce((acc, item) => {
    return item.type === 'income' ? acc + item.amount : acc - item.amount;
  }, 0);

  const HomeScreen = () => (
    <View style={styles.screen}>
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Balance Total</Text>
        <Text style={[styles.balanceAmount, { color: balance >= 0 ? colors.income : colors.expense }]}>
          ${balance.toFixed(2)}
        </Text>
      </View>

      <ScrollView style={styles.transactionsList}>
        <Text style={styles.sectionTitle}>Transacciones Recientes</Text>
        {expenses.map((item) => (
          <View key={item.id} style={styles.transactionItem}>
            <View>
              <Text style={styles.transactionDescription}>{item.description}</Text>
              <Text style={styles.transactionCategory}>{item.category}</Text>
            </View>
            <Text style={[styles.transactionAmount, { color: item.type === 'income' ? colors.income : colors.expense }]}>
              {item.type === 'income' ? '+' : '-'}${item.amount}
            </Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={() => setCurrentScreen('add')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );

  const AddScreen = () => (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setCurrentScreen('home')}>
          <Text style={styles.backButton}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Agregar Transacción</Text>
      </View>
      
      <View style={styles.addForm}>
        <Text style={styles.comingSoon}>Formulario próximamente...</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => {
            const newExpense = {
              id: Date.now(),
              type: 'expense',
              amount: Math.floor(Math.random() * 100) + 10,
              description: 'Nueva transacción',
              category: 'General'
            };
            setExpenses([...expenses, newExpense]);
            setCurrentScreen('home');
          }}
        >
          <Text style={styles.addButtonText}>Agregar Transacción de Prueba</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const StatsScreen = () => (
    <View style={styles.screen}>
      <Text style={styles.screenTitle}>Estadísticas</Text>
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Total Ingresos</Text>
          <Text style={[styles.statValue, { color: colors.income }]}>
            ${expenses.filter(e => e.type === 'income').reduce((acc, e) => acc + e.amount, 0)}
          </Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Total Gastos</Text>
          <Text style={[styles.statValue, { color: colors.expense }]}>
            ${expenses.filter(e => e.type === 'expense').reduce((acc, e) => acc + e.amount, 0)}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      {currentScreen === 'add' ? (
        <AddScreen />
      ) : (
        <>
          {/* Header */}
          <View style={styles.mainHeader}>
            <Text style={styles.appTitle}>ExpenseTracker</Text>
          </View>

          {/* Content */}
          {currentScreen === 'home' ? <HomeScreen /> : <StatsScreen />}

          {/* Bottom Navigation */}
          <View style={styles.bottomNav}>
            <TouchableOpacity
              style={[styles.navButton, currentScreen === 'home' && styles.navButtonActive]}
              onPress={() => setCurrentScreen('home')}
            >
              <Text style={[styles.navText, currentScreen === 'home' && styles.navTextActive]}>
                Inicio
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.navButton, currentScreen === 'stats' && styles.navButtonActive]}
              onPress={() => setCurrentScreen('stats')}
            >
              <Text style={[styles.navText, currentScreen === 'stats' && styles.navTextActive]}>
                Stats
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  mainHeader: {
    backgroundColor: colors.white,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
  },
  screen: {
    flex: 1,
    padding: 20,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
  },
  balanceCard: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  balanceLabel: {
    fontSize: 16,
    color: colors.gray,
    marginBottom: 5,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  transactionsList: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 15,
  },
  transactionItem: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  transactionCategory: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  fabText: {
    fontSize: 24,
    color: colors.white,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 5,
  },
  navButtonActive: {
    backgroundColor: colors.primary,
  },
  navText: {
    fontSize: 16,
    color: colors.gray,
    fontWeight: '500',
  },
  navTextActive: {
    color: colors.white,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginLeft: 20,
  },
  addForm: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  comingSoon: {
    fontSize: 18,
    color: colors.gray,
    marginBottom: 30,
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
  addButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  statsContainer: {
    gap: 15,
  },
  statCard: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statLabel: {
    fontSize: 16,
    color: colors.gray,
    marginBottom: 5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

