# Rise Low-Code Builder - Project Rules

## Security

### Sensitive Files
DO NOT read or modify:
- .env files
- API keys or secrets
- User's keychain data

### Critical Security
- Expression sandboxing must be secure
- Never bypass security for convenience
- All user code runs in isolated contexts
- Validate and sanitize all input

## Architecture

### Core Principles
1. Plugin-ready design
2. Manifest as source of truth
3. Bidirectional workflow support
4. Clean, maintainable code output

### Plugin Interface
- Use FrameworkPlugin interface
- Keep React-specific in ReactPlugin
- Design for Vue/Svelte future support
- Use semantic descriptions

### Expression System
- Tier 1: Sandboxed, no side effects
- Tier 2: Full power, explicit creation

## Code Style

### TypeScript
- Strict mode
- Define all interfaces
- Avoid `any`, use `unknown`
- Use type guards

### React
- Functional components only
- Hooks for state
- Error boundaries
- PropTypes for generated code

### Naming
- Components: PascalCase
- Utilities: camelCase
- Constants: UPPER_SNAKE_CASE
- Tests: Component.test.tsx

### Error Handling
- Try-catch for async
- Return Result types
- Never swallow errors
- Include context

### Performance
- Debounce changes (500ms)
- React.memo for expensive components
- Virtual scrolling > 50 items
- Profile before optimizing

## Testing

### Unit Tests For:
- Manifest validation
- Expression parsing/sandboxing
- Code generation
- Plugin interfaces

### Integration Tests For:
- Complete workflows
- File system ops
- IPC communication

### Manual Testing For:
- UI/UX flows
- Accessibility
- Cross-platform

## Documentation

Update when changing:
- Relevant docs in `docs/`
- Code comments
- README.md
- DOCUMENTATION_INDEX.md

## Git Workflow

### Commits
Format: `[component] description`

Examples:
- `[manifest] Add circular dependency validation`
- `[codegen] Implement React generator`
- `[ui] Add component tree context menu`

### Branches
- `main`: Stable only
- `develop`: Integration
- `feature/*`: New features
- `fix/*`: Bug fixes