# ExpenseTracker 💰

A modern, cross-platform expense tracking application built with React Native. Track your income and expenses with an intuitive interface, categorization, and insightful statistics.

![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android-blue)
![React Native](https://img.shields.io/badge/React%20Native-0.81.x-green)
![License](https://img.shields.io/badge/license-MIT-blue)

## ✨ Features

### 📊 **Financial Management**
- ✅ **Income & Expense Tracking**: Log all your financial transactions
- ✅ **Category Organization**: Pre-defined categories for better organization
- ✅ **Real-time Balance**: Automatic balance calculation
- ✅ **Date Management**: Custom date selection for each transaction

### 📱 **User Experience**
- ✅ **Cross-Platform**: Native iOS and Android support
- ✅ **Intuitive Interface**: Clean, modern UI design
- ✅ **Safe Area Support**: Proper handling of device notches and status bars
- ✅ **Responsive Design**: Optimized for various screen sizes

### 🌍 **Internationalization**
- ✅ **Multi-language Support**: English and Spanish translations
- ✅ **Localized Content**: All UI elements properly translated

### 📈 **Analytics**
- ✅ **Statistics Dashboard**: Visual representation of spending patterns
- ✅ **Category Breakdown**: Detailed analysis by expense categories
- ✅ **Balance Overview**: Income vs expenses visualization

## 🛠 Technologies Used

### **Core Framework**
- **React Native 0.81.x** - Cross-platform mobile development
- **React 18.x** - UI component library
- **JavaScript ES6+** - Modern JavaScript features

### **Navigation & UI**
- **Custom Navigation System** - Lightweight tab-based navigation
- **React Native Vector Icons** - Iconography
- **SafeAreaView** - Device-safe area handling

### **Data Management**
- **AsyncStorage** - Local data persistence
- **Custom Storage Service** - Abstracted data layer

### **Internationalization**
- **i18n-js v4** - Multi-language support

### **Date Management**
- **@react-native-community/datetimepicker** - Native date picker

### **Development Tools**
- **Metro Bundler** - JavaScript bundling
- **Watchman-free Configuration** - Stable file watching
- **ESLint & Prettier** - Code formatting and linting

## 📁 Project Structure

```
ExpenseTracker/
├── 📱 android/                 # Android-specific files
├── 📱 ios/                     # iOS-specific files
├── 📦 src/
│   ├── 🎨 components/          # Reusable UI components
│   │   ├── CategorySelector.js
│   │   ├── Charts.js
│   │   ├── DateFilter.js
│   │   └── ExpenseItem.js
│   ├── 🔧 constants/           # App constants
│   │   ├── categories.js       # Expense categories
│   │   ├── colors.js          # Color palette
│   │   └── styles.js          # Centralized styles
│   ├── 🌍 locales/            # Internationalization
│   │   ├── en.js              # English translations
│   │   ├── es.js              # Spanish translations
│   │   └── index.js           # i18n configuration
│   ├── 📺 screens/            # Main app screens
│   │   ├── AddExpenseScreen.js # Add/Edit transactions
│   │   ├── HomeScreen.js      # Main dashboard
│   │   └── StatsScreen.js     # Statistics view
│   ├── 🔧 utils/              # Utility functions
│   │   ├── helpers.js         # Helper functions
│   │   └── storage.js         # Data storage service
│   └── App.js                 # Main app component
├── 📋 package.json            # Dependencies and scripts
└── 📖 README.md               # This file
```

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **React Native CLI**
- **Android Studio** (for Android development)
- **Xcode** (for iOS development - macOS only)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ExpenseTracker.git
   cd ExpenseTracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **iOS Setup** (macOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

### 🏃‍♂️ Running the App

#### Option 1: With Metro Bundler (Development)
```bash
# Start Metro bundler
npx react-native start

# In a new terminal, run iOS
npx react-native run-ios

# Or run Android
npx react-native run-android
```

#### Option 2: With Embedded Bundle (Production-like)
```bash
# Create iOS bundle
npx react-native bundle --platform ios --dev false --entry-file index.js --bundle-output ios/ExpenseTracker/main.jsbundle

# Create Android bundle
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle

# Run iOS
FORCE_BUNDLING=1 npx react-native run-ios --no-packager

# Run Android
cd android && ./gradlew assembleDebug && cd ..
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

## 🎮 Usage

### Adding Transactions
1. Tap the **"+"** button on the home screen
2. Select transaction type (**Income** or **Expense**)
3. Enter the amount and description
4. Choose a category from the available options
5. Select the date (defaults to today)
6. Tap **"Save"** to add the transaction

### Viewing Statistics
1. Navigate to the **"Stats"** tab
2. View your financial overview including:
   - Total income
   - Total expenses
   - Current balance
   - Category breakdown

### Managing Categories

**Income Categories:**
- 💼 Salary
- 💻 Freelance
- 📈 Investment
- 🎁 Gift
- 💰 Other Income

**Expense Categories:**
- 🍔 Food
- 🚗 Transport
- 🛍 Shopping
- 🎬 Entertainment
- 📄 Bills
- 🏥 Health
- 📚 Education
- 🏠 Home
- 💸 Other Expense

## 🌐 Internationalization

The app supports multiple languages:

- **English** (en) - Default
- **Spanish** (es)

To add a new language:
1. Create a new file in `src/locales/`
2. Add translations following the existing structure
3. Import and add to the i18n configuration

## 🔧 Configuration

### Environment Setup
The app uses embedded bundles to avoid Metro/Watchman issues:

```javascript
// metro.config.js
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

### Storage Configuration
Data is persisted using AsyncStorage with a custom service layer:

```javascript
// src/utils/storage.js
export const StorageService = {
  saveTransaction: async (transaction) => { /* ... */ },
  getTransactions: async () => { /* ... */ },
  deleteTransaction: async (id) => { /* ... */ }
};
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📱 Platform-Specific Features

### iOS Features
- ✅ **SafeAreaView**: Proper handling of notches and Dynamic Island
- ✅ **Native Date Picker**: iOS-style date selection
- ✅ **App Icons**: iOS app icon configuration

### Android Features
- ✅ **SafeAreaView**: Status bar and navigation bar handling
- ✅ **Vector Icons**: Properly linked vector icon fonts
- ✅ **Native Date Picker**: Material Design date picker

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Add JSDoc comments for new functions
- Test on both iOS and Android
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Native Community** for excellent open-source tools
- **Vector Icons** for beautiful iconography
- **AsyncStorage** team for reliable data persistence

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/ExpenseTracker/issues) section
2. Create a new issue with detailed information
3. Include screenshots and device information

---

**Made with ❤️ using React Native**