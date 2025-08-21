/**
 * @fileoverview Main application component for ExpenseTracker
 * @description This is the root component that manages navigation between screens
 * and handles the main application state. It implements a custom tab-based
 * navigation system without external navigation libraries.
 * 
 * @author Yordan Iturra
 * @version 1.0.0
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import i18n from './locales';
import { colors } from './constants/colors';

// Import application screens
import HomeScreen from './screens/HomeScreen';
import AddExpenseScreen from './screens/AddExpenseScreen';
import StatsScreen from './screens/StatsScreen';

/**
 * Main Application Component
 * 
 * @description The root component that provides navigation between different screens
 * using a custom tab-based system. Manages global application state including
 * current screen selection and expense addition modal state.
 * 
 * @component
 * @returns {React.JSX.Element} The main application interface
 * 
 * @example
 * ```jsx
 * import App from './src/App';
 * 
 * export default function Main() {
 *   return <App />;
 * }
 * ```
 */
export default function App() {
  /** @type {[string, function]} Current active screen state */
  const [currentScreen, setCurrentScreen] = useState('home');
  
  /** @type {[boolean, function]} Add expense modal visibility state */
  const [showAddExpense, setShowAddExpense] = useState(false);

  /**
   * Renders the appropriate screen component based on current navigation state
   * 
   * @function renderScreen
   * @returns {React.JSX.Element} The screen component to display
   * @private
   */
  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onAddExpense={() => setShowAddExpense(true)} />;
      case 'stats':
        return <StatsScreen />;
      default:
        return <HomeScreen onAddExpense={() => setShowAddExpense(true)} />;
    }
  };

  if (showAddExpense) {
    return (
      <AddExpenseScreen 
        onClose={() => setShowAddExpense(false)}
        onSave={() => {
          setShowAddExpense(false);
          // Optionally refresh the home screen or stats after saving
          setCurrentScreen('home');
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {currentScreen === 'home' ? i18n.t('home') : i18n.t('statistics')}
        </Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {renderScreen()}
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={[styles.navButton, currentScreen === 'home' && styles.navButtonActive]}
          onPress={() => setCurrentScreen('home')}
        >
          <Icon 
            name={currentScreen === 'home' ? 'home' : 'home-outline'} 
            size={24} 
            color={currentScreen === 'home' ? colors.gold : colors.gray400} 
          />
          <Text style={[styles.navText, currentScreen === 'home' && styles.navTextActive]}>
            {i18n.t('home')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navButton, currentScreen === 'stats' && styles.navButtonActive]}
          onPress={() => setCurrentScreen('stats')}
        >
          <Icon 
            name={currentScreen === 'stats' ? 'stats-chart' : 'stats-chart-outline'} 
            size={24} 
            color={currentScreen === 'stats' ? colors.gold : colors.gray400} 
          />
          <Text style={[styles.navText, currentScreen === 'stats' && styles.navTextActive]}>
            {i18n.t('statistics')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray900,
  },
  header: {
    backgroundColor: colors.gray800,
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray700,
  },
  headerTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: colors.gray800,
    borderTopWidth: 1,
    borderTopColor: colors.gray700,
    paddingBottom: 20,
    paddingTop: 8,
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navButtonActive: {
    backgroundColor: colors.gray700,
  },
  navText: {
    color: colors.gray400,
    fontSize: 12,
    marginTop: 4,
  },
  navTextActive: {
    color: colors.gold,
  },
});