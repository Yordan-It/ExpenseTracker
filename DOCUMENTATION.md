# ExpenseTracker - Technical Documentation

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Component Documentation](#component-documentation)
3. [Data Management](#data-management)
4. [State Management](#state-management)
5. [Styling System](#styling-system)
6. [Internationalization](#internationalization)
7. [Build Configuration](#build-configuration)
8. [Development Guidelines](#development-guidelines)
9. [Troubleshooting](#troubleshooting)
10. [API Reference](#api-reference)

---

## Architecture Overview

ExpenseTracker follows a component-based architecture with the following principles:

### Design Patterns
- **Component Composition**: Reusable UI components
- **Custom Hooks**: State management and side effects
- **Service Layer**: Data abstraction and business logic
- **Configuration-based**: Centralized constants and styles

### Technology Stack
```
┌─────────────────────────────────────┐
│              React Native           │
├─────────────────────────────────────┤
│         Custom Navigation           │
├─────────────────────────────────────┤
│     AsyncStorage + Custom Service   │
├─────────────────────────────────────┤
│        i18n-js Localization        │
└─────────────────────────────────────┘
```

---

## Component Documentation

### Core Components

#### 1. App Component (`src/App.js`)
**Purpose**: Root application component managing navigation and global state.

**State Management**:
```javascript
const [currentScreen, setCurrentScreen] = useState('home');
const [showAddExpense, setShowAddExpense] = useState(false);
```

**Key Features**:
- Custom tab-based navigation
- Modal management for add expense screen
- Screen rendering logic

**Navigation Flow**:
```
Home Screen ←→ Stats Screen
     ↓
Add Expense Modal
```

#### 2. HomeScreen Component (`src/screens/HomeScreen.js`)
**Purpose**: Main dashboard displaying balance and recent transactions.

**Key Features**:
- Real-time balance calculation
- Transaction list with categories
- Floating Action Button (FAB) for adding transactions

**Props Interface**:
```typescript
interface HomeScreenProps {
  onAddExpense: () => void;
}
```

#### 3. AddExpenseScreen Component (`src/screens/AddExpenseScreen.js`)
**Purpose**: Form interface for creating new transactions.

**State Management**:
```javascript
const [type, setType] = useState('expense');          // 'income' | 'expense'
const [amount, setAmount] = useState('');             // string
const [description, setDescription] = useState('');   // string
const [selectedCategory, setSelectedCategory] = useState(''); // string
const [date, setDate] = useState(new Date());         // Date object
const [showDatePicker, setShowDatePicker] = useState(false); // boolean
```

**Validation Flow**:
1. Input validation using `validateTransaction()`
2. Category selection validation
3. Amount parsing and validation
4. Date validation

**Form Submission Process**:
```javascript
const handleSave = async () => {
  // 1. Create transaction object
  const transaction = {
    type,
    amount: parseFloat(amount),
    description,
    category: selectedCategory,
    date: date.toISOString(),
  };

  // 2. Validate transaction
  const validation = validateTransaction(transaction);
  
  // 3. Save if valid
  if (validation.isValid) {
    await StorageService.saveTransaction(transaction);
    onSave();
  }
};
```

#### 4. StatsScreen Component (`src/screens/StatsScreen.js`)
**Purpose**: Analytics dashboard showing financial insights.

**Key Metrics**:
- Total Income
- Total Expenses
- Current Balance
- Category-wise breakdown

---

## Data Management

### Storage Service (`src/utils/storage.js`)

**Purpose**: Abstraction layer for data persistence using AsyncStorage.

```javascript
export const StorageService = {
  /**
   * Save a new transaction
   * @param {Object} transaction - Transaction object
   * @returns {Promise<void>}
   */
  saveTransaction: async (transaction) => {
    const transactions = await getTransactions();
    transactions.push({
      ...transaction,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    });
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  },

  /**
   * Retrieve all transactions
   * @returns {Promise<Array>} Array of transactions
   */
  getTransactions: async () => {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  /**
   * Delete a transaction by ID
   * @param {string} id - Transaction ID
   * @returns {Promise<void>}
   */
  deleteTransaction: async (id) => {
    const transactions = await getTransactions();
    const filtered = transactions.filter(t => t.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
};
```

### Transaction Data Model

```typescript
interface Transaction {
  id: string;                    // Unique identifier
  type: 'income' | 'expense';    // Transaction type
  amount: number;                // Transaction amount
  description: string;           // User description
  category: string;              // Category ID
  date: string;                  // ISO date string
  createdAt: string;             // Creation timestamp
}
```

---

## State Management

### Local Component State
Each screen manages its own local state using React's `useState` hook:

```javascript
// Example: AddExpenseScreen state
const [formData, setFormData] = useState({
  type: 'expense',
  amount: '',
  description: '',
  category: '',
  date: new Date()
});
```

### Shared State
Currently, the app uses prop drilling for shared state. Future versions may implement Context API or Redux for more complex state management.

---

## Styling System

### Centralized Styles (`src/constants/styles.js`)

**Architecture**:
```javascript
// Screen-specific styles
const homeStyles = StyleSheet.create({ /* ... */ });
const addExpenseStyles = StyleSheet.create({ /* ... */ });
const statsStyles = StyleSheet.create({ /* ... */ });

// Combined export
export const styles = { 
  ...homeStyles, 
  ...addExpenseStyles, 
  ...statsStyles 
};

// Individual exports
export { homeStyles, addExpenseStyles, statsStyles };
```

### Color System (`src/constants/colors.js`)

```javascript
export const colors = {
  // Primary colors
  primary: '#4CAF50',
  gold: '#FFD700',
  
  // Background colors
  gray900: '#1a1a1a',
  gray800: '#2d2d2d',
  gray700: '#3d3d3d',
  
  // Text colors
  white: '#FFFFFF',
  gray300: '#d4d4d8',
  gray400: '#a1a1aa',
  
  // Semantic colors
  success: '#10b981',
  error: '#ef4444',
  income: '#10b981',
  expense: '#ef4444',
};
```

### Responsive Design
- Uses percentage-based widths
- Flexible layouts with Flexbox
- SafeAreaView for device compatibility

---

## Internationalization

### i18n Configuration (`src/locales/index.js`)

```javascript
import { I18n } from 'i18n-js';
import en from './en';
import es from './es';

const i18n = new I18n({
  en,
  es,
});

i18n.defaultLocale = 'en';
i18n.locale = 'en';
i18n.enableFallback = true;

export default i18n;
```

### Translation Structure

```javascript
// src/locales/en.js
export default {
  // Navigation
  home: 'Home',
  statistics: 'Statistics',
  
  // Actions
  addExpense: 'Add Expense',
  addIncome: 'Add Income',
  save: 'Save',
  cancel: 'Cancel',
  
  // Form fields
  amount: 'Amount',
  description: 'Description',
  category: 'Category',
  date: 'Date',
  
  // Categories
  food: 'Food',
  transport: 'Transport',
  // ... more categories
};
```

### Adding New Languages

1. Create new translation file in `src/locales/`
2. Import and add to i18n configuration
3. Test all translated strings
4. Update documentation

---

## Build Configuration

### Metro Configuration (`metro.config.js`)

**Watchman-free Configuration**:
```javascript
const config = {
  resolver: {
    unstable_enableSymlinks: false,
  },
  fileMap: {
    watchman: false,
  },
  watchFolders: [],
};
```

**Benefits**:
- Avoids "too many open files" errors
- More stable file watching
- Better performance on some systems

### Bundle Creation

**iOS Bundle**:
```bash
npx react-native bundle \
  --platform ios \
  --dev false \
  --entry-file index.js \
  --bundle-output ios/ExpenseTracker/main.jsbundle
```

**Android Bundle**:
```bash
npx react-native bundle \
  --platform android \
  --dev false \
  --entry-file index.js \
  --bundle-output android/app/src/main/assets/index.android.bundle
```

---

## Development Guidelines

### Code Style

**Component Structure**:
```javascript
/**
 * JSDoc header
 */

// 1. Imports
import React from 'react';

// 2. Component definition with JSDoc
/**
 * Component description
 * @param {Object} props
 * @returns {React.JSX.Element}
 */
const MyComponent = ({ prop1, prop2 }) => {
  // 3. State declarations
  const [state, setState] = useState(initialValue);
  
  // 4. Effect hooks
  useEffect(() => {
    // Effect logic
  }, []);
  
  // 5. Event handlers
  const handleEvent = () => {
    // Handler logic
  };
  
  // 6. Render logic
  return (
    <View>
      {/* JSX */}
    </View>
  );
};

// 7. Export
export default MyComponent;
```

**Naming Conventions**:
- Components: PascalCase (`AddExpenseScreen`)
- Files: PascalCase for components, camelCase for utilities
- Functions: camelCase (`handleSave`)
- Constants: UPPER_SNAKE_CASE (`STORAGE_KEY`)

### Testing Guidelines

**Unit Tests**:
```javascript
// Component testing
describe('AddExpenseScreen', () => {
  it('should render form fields', () => {
    // Test implementation
  });
  
  it('should validate form input', () => {
    // Test implementation
  });
});

// Service testing
describe('StorageService', () => {
  it('should save transaction', async () => {
    // Test implementation
  });
});
```

---

## Troubleshooting

### Common Issues

#### 1. Metro Bundle Errors
**Problem**: Bundle creation fails with Watchman errors
**Solution**: Use embedded bundle approach
```bash
npx react-native bundle --platform ios --dev false
```

#### 2. iOS Build Errors
**Problem**: Missing main.jsbundle file
**Solution**: Ensure bundle is created and in correct location
```bash
ls -la ios/ExpenseTracker/main.jsbundle
```

#### 3. Android Vector Icons
**Problem**: Icons not displaying
**Solution**: Check font linking and MainApplication.kt
```kotlin
import com.oblador.vectoricons.VectorIconsPackage
// Add to getPackages()
add(VectorIconsPackage())
```

#### 4. i18n Translation Errors
**Problem**: Missing translations or fallback errors
**Solution**: Check translation file structure and i18n configuration

### Debug Commands

```bash
# Check Android device connection
adb devices

# View Android logs
adb logcat

# iOS simulator logs
xcrun simctl spawn booted log stream --predicate 'process == "ExpenseTracker"'

# Clear Metro cache
npx react-native start --reset-cache
```

---

## API Reference

### StorageService Methods

#### `saveTransaction(transaction: Transaction): Promise<void>`
Saves a new transaction to local storage.

#### `getTransactions(): Promise<Transaction[]>`
Retrieves all stored transactions.

#### `deleteTransaction(id: string): Promise<void>`
Removes a transaction by ID.

### Helper Functions

#### `validateTransaction(transaction: Object): ValidationResult`
Validates transaction data before saving.

```javascript
interface ValidationResult {
  isValid: boolean;
  errors: {
    amount?: string;
    description?: string;
    category?: string;
  };
}
```

#### `formatCurrency(amount: number): string`
Formats number as currency string.

#### `getCategoryIcon(categoryId: string): string`
Returns icon name for given category.

---

## Performance Considerations

### Optimization Strategies

1. **Lazy Loading**: Components loaded on demand
2. **Memoization**: Expensive calculations cached
3. **Virtualization**: Large lists use FlatList
4. **Image Optimization**: Vector icons instead of images
5. **Bundle Splitting**: Platform-specific bundles

### Memory Management

- Proper cleanup of event listeners
- Avoiding memory leaks in async operations
- Efficient state updates

---

## Security Considerations

### Data Protection
- Local storage only (no external APIs)
- No sensitive data transmission
- Secure storage using AsyncStorage encryption (future enhancement)

### Input Validation
- Client-side validation for all user inputs
- Sanitization of text inputs
- Amount validation for financial data

---

## Future Enhancements

### Planned Features
1. **Export Functionality**: CSV/PDF export
2. **Backup/Restore**: Cloud storage integration
3. **Advanced Analytics**: Charts and graphs
4. **Budgeting**: Monthly budget tracking
5. **Categories Management**: Custom categories
6. **Multi-currency**: Currency conversion support

### Technical Improvements
1. **State Management**: Redux or Zustand integration
2. **Testing**: Comprehensive test suite
3. **Performance**: React.memo optimization
4. **Accessibility**: Screen reader support
5. **Offline Support**: Enhanced offline capabilities

---

**Last Updated**: December 2024  
**Version**: 1.0.0  
**Maintainer**: ExpenseTracker Team

