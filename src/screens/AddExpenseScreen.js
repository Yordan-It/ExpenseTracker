/**
 * @fileoverview Add/Edit Expense Screen Component
 * @description This screen allows users to add new income or expense transactions
 * with proper validation, category selection, and date picking functionality.
 * 
 * @author Yordan Iturra
 * @version 1.0.0
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from '../constants/colors';
import { categories } from '../constants/categories';
import { StorageService } from '../utils/storage';
import { validateTransaction } from '../utils/helpers';
import i18n from '../locales';
import { addExpenseStyles as styles } from '../constants/styles';

/**
 * Add Expense Screen Component
 * 
 * @description A comprehensive form screen for adding or editing financial transactions.
 * Supports both income and expense entries with category selection, date picking,
 * and form validation. Features a modern UI with SafeAreaView support for all devices.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {function} props.onClose - Callback function to close the screen
 * @param {function} props.onSave - Callback function called after successful save
 * @returns {React.JSX.Element} The add expense screen interface
 * 
 * @example
 * ```jsx
 * <AddExpenseScreen 
 *   onClose={() => setShowModal(false)}
 *   onSave={() => {
 *     setShowModal(false);
 *     refreshTransactions();
 *   }}
 * />
 * ```
 */
const AddExpenseScreen = ({ onClose, onSave }) => {
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = async () => {
    const transaction = {
      type,
      amount: parseFloat(amount),
      description,
      category: selectedCategory,
      date: date.toISOString(),
    };

    const validation = validateTransaction(transaction);
    if (!validation.isValid) {
      Alert.alert('Error', Object.values(validation.errors).join('\n'));
      return;
    }

    try {
      await StorageService.saveTransaction(transaction);
      onSave();
    } catch (error) {
      Alert.alert('Error', i18n.t('errorSaving'));
    }
  };

  const getCategoryList = () => categories[type];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header con botón de cerrar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Icon name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {type === 'expense' ? i18n.t('addExpense') : i18n.t('addIncome')}
        </Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* Type Toggle */}
        <View style={styles.typeContainer}>
        <TouchableOpacity
          style={[styles.typeButton, type === 'expense' && styles.typeButtonActive]}
          onPress={() => setType('expense')}
        >
          <Text style={[styles.typeText, type === 'expense' && styles.typeTextActive]}>
            {i18n.t('expense')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.typeButton, type === 'income' && styles.typeButtonActive]}
          onPress={() => setType('income')}
        >
          <Text style={[styles.typeText, type === 'income' && styles.typeTextActive]}>
            {i18n.t('income')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Amount Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{i18n.t('amount')}</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          keyboardType="decimal-pad"
          placeholder="0.00"
          placeholderTextColor={colors.gray500}
        />
      </View>

      {/* Description Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{i18n.t('description')}</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          placeholder={i18n.t('description')}
          placeholderTextColor={colors.gray500}
        />
      </View>

      {/* Date Picker */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{i18n.t('date')}</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
          <Icon name="calendar-outline" size={20} color={colors.gray400} />
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
      )}

      {/* Category Selection */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{i18n.t('category')}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {getCategoryList().map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryChip,
                selectedCategory === category.id && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Icon 
                name={category.icon} 
                size={20} 
                color={selectedCategory === category.id ? colors.white : category.color} 
              />
              <Text style={[
                styles.categoryText,
                selectedCategory === category.id && styles.categoryTextActive,
              ]}>
                {i18n.t(category.name)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={onClose}
        >
          <Text style={styles.cancelButtonText}>{i18n.t('cancel')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.saveButton]}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>{i18n.t('save')}</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddExpenseScreen;