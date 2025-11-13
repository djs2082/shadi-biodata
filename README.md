# Shadi Biodata Maker

A modern web application for creating beautiful marriage biodata/profiles with customizable templates and PDF export functionality.

## ✨ Features

- 📝 Interactive form with dynamic field management
- 🖼️ Image upload with cropping functionality
- 🎨 Professionally designed templates
- 📄 PDF export with high-quality output
- 💾 Auto-save with local storage and IndexedDB
- 📱 Fully responsive design
- ♿ Accessible and user-friendly interface
- 🎯 Type-safe with TypeScript
- 🔧 Modern tooling with ESLint, Prettier, and Husky

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm 8+
- Modern web browser

### Installation

```bash
# Clone repository
git clone <repo-url>
cd shadi-biodata

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm start
```

Application will open at `http://localhost:3000`

## 🛠️ Development

### Available Scripts

- `npm start` - Start development server
- `npm test` - Run tests in watch mode
- `npm run build` - Build for production
- `npm run lint` - Lint code with ESLint
- `npm run lint:fix` - Fix linting issues automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Project Structure

```
src/
├── components/           # React components
│   ├── BioDataForm/     # Main form component
│   ├── BioDataTemplates/# PDF templates
│   └── UtilComponents/  # Reusable UI components
├── constants/           # App constants
├── hooks/              # Custom React hooks
├── services/           # Business logic and API calls
│   ├── indexedDB.js    # Image storage service
│   └── localStorageService.ts # Data persistence
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
    └── logger.ts       # Logging utility
```

### Code Style

This project uses:

- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** for code formatting
- **Husky** for git hooks
- **lint-staged** for pre-commit checks

Code is automatically formatted and linted on commit.

## 🎨 Tech Stack

- **React 18.3** - UI framework
- **TypeScript 4.9** - Type safety
- **Tailwind CSS 3** - Utility-first styling
- **Sass** - CSS preprocessing
- **Zustand 5** - State management
- **Material-UI 6** - Component library
- **@react-pdf/renderer 4** - PDF generation
- **React Router 6** - Routing
- **React Cropper** - Image cropping
- **Create React App** - Build tooling

## 📦 Build & Deploy

### Build for Production

```bash
npm run build
```

Output: `build/` directory containing optimized production build

### Deploy

Supports deployment to:

- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

The application is client-side only with no backend requirements.

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## 🔧 Development Workflow

1. Create a new branch for your feature
2. Make your changes
3. Run linting and tests: `npm run lint && npm test`
4. Build the project: `npm run build`
5. Commit changes (pre-commit hooks will run automatically)
6. Push and create a pull request

### Git Hooks

Pre-commit hooks automatically:

- Lint and fix code with ESLint
- Format code with Prettier
- Check for TypeScript errors

## 🗂️ Data Storage

The application uses:

- **LocalStorage** - Form data persistence
- **IndexedDB** - Image storage (cropped photos)

All data is stored locally in the browser. No data is sent to any server.

## 🌐 Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_COUNTER_API_URL=https://api.counterapi.dev/v1
```

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📚 Documentation

- [Architecture Documentation](ARCHITECTURE.md) - System design and patterns
- [Contributing Guidelines](CONTRIBUTING.md) - How to contribute

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- Design inspired by traditional Indian biodata formats
- Icons from Material-UI
- Fonts from Google Fonts
- Built with Create React App

---

Made with ❤️ for the Indian wedding community
