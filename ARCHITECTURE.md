# Architecture Documentation

## Overview

Shadi Biodata Maker is a React single-page application (SPA) built with TypeScript, following modern React patterns with separation of concerns between UI, business logic, and data persistence.

## Design Principles

1. **Component Composition** - Reusable components following React best practices
2. **Separation of Concerns** - UI, business logic, and data are clearly separated
3. **Type Safety** - Full TypeScript coverage for reliability
4. **Performance First** - Optimized rendering and efficient data handling
5. **Accessibility** - WCAG 2.1 AA compliant components

## Technology Stack

### Core

- **React 18.3** - Component-based UI library
- **TypeScript 4.9** - Static type checking
- **Create React App** - Build tooling and development server

### UI & Styling

- **Material-UI 6** - Component library
- **Tailwind CSS 3** - Utility-first CSS framework
- **Sass** - CSS preprocessing
- **React Cropper** - Image manipulation

### State Management

- **Zustand 5** - Lightweight state management
- **React Context** - UI state and modals

### Data & Storage

- **IndexedDB** - Client-side image storage
- **LocalStorage** - Form data persistence
- **@react-pdf/renderer** - PDF generation

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Pre-commit checks

## Component Architecture

### Current Structure

The application follows a feature-based component organization:

```
src/components/
├── BioDataForm/              # Main form feature
│   ├── index.tsx            # Form container
│   ├── index.store.ts       # Zustand store
│   ├── viewModel.ts         # Business logic
│   ├── formDataFields.ts    # Form configuration
│   └── components/          # Form-specific components
│       ├── FormGroup.tsx
│       ├── AddImage.tsx
│       └── MobileAddImage.tsx
├── BioDataTemplates/         # PDF templates
│   └── BasicTemplate.jsx    # Template implementation
└── UtilComponents/           # Shared UI components
    ├── Buttons/
    ├── Modals/
    └── FormField.tsx
```

### Component Categories

**Feature Components** (100-200 lines)

- Complete features: BioDataForm, BioDataTemplates
- Contain business logic and state management
- Connect to services and stores

**UI Components** (50-150 lines)

- Reusable elements: Buttons, FormField, Modal
- Presentation-focused
- Accept props, minimal logic

## State Management Strategy

### Global State (Zustand)

Used for form data and application state:

```typescript
interface BioDataFormDataStore {
  data: FormDataFieldGroup[]; // Form fields and values
  croppedImage: string | null; // User photo
  showAddNewFieldForm: boolean; // UI state
  downloadFileName: string; // Generated filename
  // ... methods
}
```

**Benefits:**

- Simple API, minimal boilerplate
- TypeScript-first design
- DevTools integration
- No provider wrapper needed

### Local State (useState)

Used for:

- Component-specific UI state
- Temporary form inputs
- Modal visibility
- Loading states

### Data Flow

```
User Input → Component → ViewModel → Store → Component Re-render
     ↓
LocalStorage/IndexedDB (Persistence)
```

## Data Architecture

### Form Data Flow

1. **Input** - User fills form fields
2. **Validation** - Client-side validation on change
3. **Store Update** - Valid data updates Zustand store
4. **Auto-save** - Store changes persist to localStorage
5. **Submit** - Generate PDF from store data

### Image Upload Flow

1. **File Selection** - User selects image file
2. **Validation** - Check file type and size
3. **Crop Modal** - User crops image
4. **Processing** - Resize to optimal dimensions (800x600)
5. **Storage** - Save blob to IndexedDB
6. **Display** - Retrieve and display from IndexedDB

### Storage Strategy

**LocalStorage** (Max ~5-10MB)

- Form field data (JSON)
- User preferences
- Auto-save drafts

**IndexedDB** (Max ~50MB-1GB)

- Cropped images (blobs)
- Binary data storage

**Benefits:**

- No backend required
- Instant save/load
- Works offline
- Privacy-focused (local-only)

## Service Layer

Services encapsulate business logic and external interactions:

### Current Services

**`localStorageService.ts`**

- Save/retrieve blob data
- Convert between blob and base64
- Error handling with logger

**`indexedDB.js`**

- Image storage in IndexedDB
- CRUD operations for images
- Async operations with promises

**`viewModel.ts`**

- Form state management
- Field manipulation (add/remove/move)
- Validation logic
- PDF generation trigger

### Service Patterns

```typescript
// Service interface
export class FeatureService {
  // Dependency injection
  constructor(private store: Store) {}

  // Public API methods
  public doSomething(): Result {
    // Business logic
    // Error handling
    // Store updates
  }
}
```

## File Organization

### Naming Conventions

- **Components**: PascalCase (`FormField.tsx`)
- **Utilities**: camelCase (`logger.ts`)
- **Types**: PascalCase (`FormDataField` interface)
- **Constants**: UPPER_SNAKE_CASE

### Module Structure

```
src/
├── components/          # React components
│   └── Feature/
│       ├── index.tsx   # Main component
│       ├── Feature.scss # Styles
│       ├── Feature.store.ts # Store
│       └── components/ # Sub-components
├── hooks/              # Custom React hooks
│   └── useMediaQuery.ts
├── services/           # Business logic
│   ├── indexedDB.js
│   └── localStorageService.ts
├── types/              # TypeScript definitions
├── utils/              # Pure functions
│   └── logger.ts
├── constants/          # App constants
└── index.tsx          # App entry point
```

## Build & Performance

### Current Build (Create React App)

- **Bundler**: Webpack 5
- **Build Time**: ~10-15s for production
- **Output**: `build/` directory
- **Code Splitting**: Manual with React.lazy()

### Performance Optimizations

1. **Image Optimization**
   - Resize to fixed dimensions (800x600)
   - JPEG compression (0.75 quality)
   - Lazy loading for templates

2. **Code Splitting**
   - Route-based splitting (future)
   - Component lazy loading where appropriate

3. **React Optimizations**
   - Functional components with hooks
   - Memoization with useMemo/useCallback
   - Avoid unnecessary re-renders

4. **Bundle Size**
   - Tree-shaking for unused code
   - Production builds minified
   - Source maps excluded from production

## Testing Strategy

### Current Testing

- **Framework**: Jest + React Testing Library
- **Coverage Goal**: > 80% for new code
- **Focus**: Critical user flows

### Test Pyramid

```
E2E Tests (Future)
    ↑
Integration Tests
    ↑
Unit Tests ← Current Focus
```

**Unit Tests**

- Utilities: 100% coverage target
- Services: Test business logic
- Components: Test rendering and interactions

**Integration Tests** (Future)

- Form submission flow
- Image upload and crop
- PDF generation

## Security Considerations

### Current Measures

1. **Input Validation**
   - Client-side validation for all inputs
   - Type safety with TypeScript
   - Sanitization before rendering

2. **XSS Prevention**
   - React's auto-escaping
   - No dangerouslySetInnerHTML usage
   - Content Security Policy ready

3. **Data Privacy**
   - All data stored locally
   - No server communication
   - No analytics or tracking

4. **Dependency Security**
   - Regular npm audit
   - Automated security updates
   - Lock file committed

## Accessibility Features

- **Semantic HTML** - Proper element usage
- **ARIA Labels** - Where semantic HTML insufficient
- **Keyboard Navigation** - All interactive elements accessible
- **Screen Reader Support** - Meaningful labels and descriptions
- **Color Contrast** - WCAG AA compliance
- **Focus Management** - Visible focus indicators

## Future Enhancements

### Planned Improvements

1. **State Management**
   - Migrate to atomic design principles
   - Extract more reusable components
   - Add state persistence middleware

2. **Build System**
   - Migrate to Vite for faster builds
   - Better tree-shaking
   - Improved HMR

3. **Testing**
   - Add integration tests
   - E2E testing with Playwright
   - Visual regression testing

4. **Features**
   - Multiple templates
   - Template customization
   - Multi-language support (i18n)
   - Cloud sync (optional)
   - Social sharing

5. **Performance**
   - Implement virtual scrolling for long forms
   - Progressive image loading
   - Service worker for offline support

## Development Workflow

### Adding New Features

1. **Plan** - Design component structure
2. **Implement** - Write component with TypeScript
3. **Style** - Add styles (Tailwind + SCSS)
4. **Test** - Write unit tests
5. **Document** - Add JSDoc comments
6. **Review** - Create PR with description

### Code Review Checklist

- [ ] TypeScript types are correct
- [ ] No console.logs (use logger utility)
- [ ] Responsive design works
- [ ] Accessibility tested
- [ ] Tests written and passing
- [ ] Documentation updated

## Troubleshooting Common Issues

### Build Issues

- Clear cache: `rm -rf node_modules/.cache`
- Reinstall deps: `rm -rf node_modules && npm install`
- Check Node version: `node --version` (requires 16+)

### Development Issues

- Port in use: Kill process on port 3000
- TypeScript errors: Check tsconfig.json
- ESLint errors: Run `npm run lint:fix`

## Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Zustand Documentation](https://zustand.docs.pmnd.rs/)
- [Material-UI Documentation](https://mui.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

---

For questions or suggestions about the architecture, please open an issue on GitHub.
