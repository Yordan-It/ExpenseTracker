# Contributing to ExpenseTracker

Thank you for your interest in contributing to ExpenseTracker! This document provides guidelines and information for contributors.

## Table of Contents
1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Setup](#development-setup)
4. [Coding Standards](#coding-standards)
5. [Commit Guidelines](#commit-guidelines)
6. [Pull Request Process](#pull-request-process)
7. [Testing Guidelines](#testing-guidelines)
8. [Documentation](#documentation)

## Code of Conduct

This project adheres to a code of conduct that we expect all contributors to follow:

- **Be respectful**: Treat all community members with respect and kindness
- **Be inclusive**: Welcome newcomers and help them contribute
- **Be collaborative**: Work together to improve the project
- **Be constructive**: Provide helpful feedback and suggestions

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- React Native development environment
- Git version control

### Fork and Clone
1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/yourusername/ExpenseTracker.git
   cd ExpenseTracker
   ```
3. Add upstream remote:
   ```bash
   git remote add upstream https://github.com/originalowner/ExpenseTracker.git
   ```

## Development Setup

### Installation
```bash
# Install dependencies
npm install

# iOS setup (macOS only)
cd ios && pod install && cd ..

# Start Metro bundler
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

### Environment Configuration
Create a `.env` file for local development:
```bash
# Development settings
NODE_ENV=development
DEBUG=true
```

## Coding Standards

### File Organization
```
src/
├── components/     # Reusable UI components
├── screens/        # Screen components
├── utils/          # Utility functions
├── constants/      # Constants and configuration
├── locales/        # Internationalization files
└── App.js          # Main app component
```

### Naming Conventions

#### Files and Directories
- Components: `PascalCase.js` (e.g., `AddExpenseScreen.js`)
- Utilities: `camelCase.js` (e.g., `helpers.js`)
- Constants: `camelCase.js` (e.g., `colors.js`)
- Directories: `camelCase` (e.g., `components/`)

#### Variables and Functions
```javascript
// Variables: camelCase
const userName = 'john';
const isLoggedIn = true;

// Functions: camelCase with descriptive names
const calculateBalance = () => {};
const formatCurrency = () => {};

// Constants: UPPER_SNAKE_CASE
const API_ENDPOINT = 'https://api.example.com';
const MAX_RETRY_COUNT = 3;

// React Components: PascalCase
const ExpenseItem = () => {};
const CategorySelector = () => {};
```

### Code Style

#### JavaScript/React
```javascript
// Use ES6+ features
const getData = async () => {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.error('Error:', error);
  }
};

// Destructuring
const { name, amount, category } = transaction;

// Arrow functions for short operations
const filteredItems = items.filter(item => item.active);

// Template literals
const message = `Transaction ${id} was created successfully`;
```

#### React Components
```javascript
// Functional components with hooks
const MyComponent = ({ prop1, prop2 }) => {
  const [state, setState] = useState(initialValue);
  
  useEffect(() => {
    // Effect logic
  }, []);
  
  return (
    <View style={styles.container}>
      <Text>{prop1}</Text>
    </View>
  );
};

// PropTypes or TypeScript for type checking
MyComponent.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
};
```

### JSDoc Documentation
All functions and components should include JSDoc comments:

```javascript
/**
 * Calculates the total balance from transactions
 * 
 * @function calculateBalance
 * @param {Array<Object>} transactions - Array of transaction objects
 * @returns {number} Total balance amount
 * 
 * @example
 * ```javascript
 * const balance = calculateBalance(transactions);
 * console.log(`Current balance: ${balance}`);
 * ```
 */
const calculateBalance = (transactions) => {
  return transactions.reduce((acc, t) => {
    return t.type === 'income' ? acc + t.amount : acc - t.amount;
  }, 0);
};
```

## Commit Guidelines

### Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

#### Examples
```bash
feat(storage): add transaction encryption

Add encryption for sensitive transaction data using AES-256.
Includes migration script for existing data.

Closes #123

fix(ui): resolve button alignment issue on Android

The save button was misaligned on Android devices due to
platform-specific padding differences.

Fixes #456
```

### Commit Best Practices
- Make atomic commits (one logical change per commit)
- Write clear, descriptive commit messages
- Reference issues and PRs when applicable
- Keep commits focused and small

## Pull Request Process

### Before Submitting
1. **Update your fork**:
   ```bash
   git checkout main
   git pull upstream main
   git push origin main
   ```

2. **Create feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make changes and test**:
   - Write code following the style guide
   - Add or update tests
   - Update documentation if needed
   - Test on both iOS and Android

4. **Commit changes**:
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

### Pull Request Template
When creating a PR, please include:

```markdown
## Description
Brief description of the changes made.

## Type of Change
- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] Tested on iOS
- [ ] Tested on Android
- [ ] Added/updated unit tests
- [ ] All existing tests pass

## Screenshots (if applicable)
Add screenshots to help explain your changes.

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
```

### Review Process
1. **Automated checks**: CI/CD pipeline runs tests and linting
2. **Code review**: Maintainers review the code
3. **Testing**: Manual testing on different devices
4. **Approval**: At least one maintainer approval required
5. **Merge**: Squash and merge into main branch

## Testing Guidelines

### Unit Tests
```javascript
// Component testing with React Native Testing Library
import { render, fireEvent } from '@testing-library/react-native';
import AddExpenseScreen from '../AddExpenseScreen';

describe('AddExpenseScreen', () => {
  it('should render form fields', () => {
    const { getByPlaceholderText } = render(
      <AddExpenseScreen onClose={() => {}} onSave={() => {}} />
    );
    
    expect(getByPlaceholderText('Amount')).toBeTruthy();
    expect(getByPlaceholderText('Description')).toBeTruthy();
  });
});

// Utility function testing
import { calculateBalance } from '../utils/helpers';

describe('calculateBalance', () => {
  it('should calculate correct balance', () => {
    const transactions = [
      { type: 'income', amount: 1000 },
      { type: 'expense', amount: 300 },
    ];
    
    expect(calculateBalance(transactions)).toBe(700);
  });
});
```

### Testing Commands
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test -- AddExpenseScreen.test.js
```

## Documentation

### Code Documentation
- Add JSDoc comments to all public functions
- Include examples in documentation
- Document complex algorithms and business logic
- Keep comments up to date with code changes

### README Updates
When adding new features:
1. Update the features list
2. Add new dependencies to the tech stack
3. Update installation instructions if needed
4. Add usage examples

### API Documentation
For new utility functions or services:
1. Document all parameters and return values
2. Include usage examples
3. Note any side effects or dependencies
4. Add to the main documentation file

## Issue Reporting

### Bug Reports
When reporting bugs, please include:

```markdown
## Bug Description
A clear description of what the bug is.

## Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected Behavior
What you expected to happen.

## Actual Behavior
What actually happened.

## Environment
- Device: [e.g. iPhone 12, Pixel 5]
- OS: [e.g. iOS 15.0, Android 11]
- App Version: [e.g. 1.0.0]

## Screenshots
If applicable, add screenshots to help explain your problem.
```

### Feature Requests
```markdown
## Feature Description
A clear description of the feature you'd like to see.

## Use Case
Explain the problem this feature would solve.

## Proposed Solution
Describe how you envision this feature working.

## Alternatives Considered
Any alternative solutions you've considered.

## Additional Context
Any other context about the feature request.
```

## Release Process

### Version Numbering
We follow [Semantic Versioning](https://semver.org/):
- **MAJOR.MINOR.PATCH** (e.g., 1.2.3)
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Checklist
- [ ] All tests pass
- [ ] Documentation updated
- [ ] Version number bumped
- [ ] Changelog updated
- [ ] Build tested on both platforms
- [ ] Performance testing completed

## Getting Help

### Communication Channels
- **GitHub Issues**: For bug reports and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Email**: For security-related issues

### Resources
- [React Native Documentation](https://reactnative.dev/)
- [JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Git Best Practices](https://git-scm.com/book)

---

Thank you for contributing to ExpenseTracker! Your help makes this project better for everyone. 🚀

