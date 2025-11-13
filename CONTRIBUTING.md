# Contributing to Shadi Biodata Maker

Thank you for your interest in contributing! 🎉

## Development Setup

1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Install dependencies: `npm install`
4. Create a branch: `git checkout -b feature/your-feature`
5. Make your changes
6. Run tests: `npm test`
7. Commit: `git commit -m "feat: your feature"`
8. Push: `git push origin feature/your-feature`
9. Create Pull Request

## Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation only
- `style:` - Code style (formatting, semicolons, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Build process or auxiliary tools

### Examples

```bash
feat: add new template for biodata
fix: resolve image cropping bug on mobile
docs: update API documentation
refactor: simplify form validation logic
test: add unit tests for storage service
chore: update dependencies to latest versions
```

## Code Style

### TypeScript

- Use TypeScript for all new files
- Avoid `any` types - use proper type definitions
- Use interfaces for object types
- Use type aliases for unions/intersections

### React Components

- Use functional components with hooks
- Keep components under 150 lines
- Extract complex logic into custom hooks
- Use meaningful component and variable names

### Code Formatting

- Follow ESLint and Prettier configurations
- Code is automatically formatted on commit via git hooks
- Run `npm run format` to manually format code
- Run `npm run lint:fix` to fix linting issues

### Best Practices

- Write meaningful variable/function names
- Add JSDoc comments for complex functions
- Keep functions small and focused
- Avoid deep nesting (max 3 levels)
- Use early returns to reduce complexity

## Pull Request Guidelines

### Before Submitting

- [ ] Code follows the project's style guidelines
- [ ] All tests pass (`npm test`)
- [ ] Code builds without errors (`npm run build`)
- [ ] Linting passes (`npm run lint`)
- [ ] Documentation is updated if needed
- [ ] Commit messages follow conventional commits

### PR Description

Include:

1. **What** - Brief description of changes
2. **Why** - Reason for the changes
3. **How** - Implementation approach
4. **Testing** - How you tested the changes
5. **Screenshots** - If UI changes are involved

### PR Size

- Keep PRs focused on a single feature/fix
- Aim for < 400 lines changed
- Split large features into multiple PRs
- Reference related issue numbers

## Development Workflow

### Adding a New Feature

1. Create feature branch: `git checkout -b feature/feature-name`
2. Implement the feature
3. Write/update tests
4. Update documentation
5. Run full test suite
6. Create PR

### Fixing a Bug

1. Create bug fix branch: `git checkout -b fix/bug-description`
2. Write a failing test that reproduces the bug
3. Fix the bug
4. Ensure test now passes
5. Create PR

### Refactoring

1. Create refactor branch: `git checkout -b refactor/what-you-refactor`
2. Ensure tests pass before refactoring
3. Refactor code
4. Ensure tests still pass
5. Create PR

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Writing Tests

- Write tests for all new features
- Maintain > 80% code coverage
- Test edge cases and error conditions
- Use descriptive test names

## Project Structure

Understanding the project structure:

```
src/
├── components/          # React components
│   ├── BioDataForm/    # Main form logic
│   ├── BioDataTemplates/ # PDF templates
│   └── UtilComponents/  # Reusable UI components
├── hooks/              # Custom React hooks
├── services/           # Business logic
├── types/              # TypeScript types
└── utils/              # Utility functions
```

## Common Tasks

### Adding a New Component

1. Create component directory: `src/components/ComponentName/`
2. Add `ComponentName.tsx` with the component
3. Add `index.ts` for exports
4. Add styles if needed (inline or SCSS)
5. Write tests in `ComponentName.test.tsx`

### Adding a New Utility

1. Create utility file: `src/utils/utilityName.ts`
2. Write the utility function with JSDoc
3. Add types for parameters and return value
4. Write tests in `utilityName.test.ts`
5. Export from `src/utils/index.ts`

### Adding a New Hook

1. Create hook file: `src/hooks/useHookName.ts`
2. Follow React hooks naming convention
3. Add proper TypeScript types
4. Write tests for the hook
5. Document usage in comments

## Need Help?

- 📖 Check the [Architecture Documentation](ARCHITECTURE.md)
- 💬 Open an issue for questions
- 🐛 Report bugs with detailed reproduction steps
- 💡 Propose features through issues first

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow

## Recognition

Contributors will be recognized in:

- README contributors section
- Release notes
- GitHub contributors page

Thank you for contributing to Shadi Biodata Maker! 🙏
