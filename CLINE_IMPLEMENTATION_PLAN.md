# Rise MVP: Cline Implementation Plan

> **Comprehensive development plan for building Rise using Cline/Claude Sonnet 4.5**  
> **Timeline**: 8-10 weeks | **AI Coverage**: 85% | **Human Review**: 15%

---

## 📋 Quick Navigation

| Section | Description |
|---------|-------------|
| [Setup & Configuration](#setup--configuration) | Initial environment setup |
| [Custom Instructions](#custom-instructions-for-cline) | Cline configuration |
| [Project .clinerules](#project-clinerules) | Project-specific rules |
| [Task Breakdown](#phase-by-phase-task-breakdown) | Detailed task list |
| [Task Templates](#task-prompt-templates) | Reusable prompt patterns |
| [Human Checkpoints](#human-review-checkpoints) | Required reviews |
| [Context Management](#context-management-strategy) | Managing Claude's context |
| [Quality Guidelines](#quality-assurance-guidelines) | QA standards |

---

## 🚀 Setup & Configuration

### Pre-Development Checklist

- [ ] Install Cline extension in VSCode
- [ ] Configure Claude Sonnet 4.5 API key
- [ ] Set up custom instructions (copy from section below)
- [ ] Create `.clinerules` file in project root
- [ ] Review all documentation in `docs/` folder
- [ ] Initialize git repository
- [ ] Create project directory structure

### Development Environment

**Required:**
- Node.js 18+
- npm or yarn
- VSCode with Cline extension
- Git

**Recommended Extensions:**
- ESLint
- Prettier
- TypeScript
- Tailwind CSS IntelliSense
- React Developer Tools

---

## ⚙️ Custom Instructions for Cline

**Copy these to Cline's custom instructions field (⚙️ → Custom Instructions):**

```markdown
# Rise Low-Code Builder Development

You are developing Rise, an AI-powered visual low-code builder. This is a complex Electron desktop application that generates clean React code.

## Core Principles

1. **DO NOT BE LAZY. DO NOT OMIT CODE.**
   - Always provide complete implementations
   - Never use comments like "// rest of the code" or "// ... existing code"
   - If a file is long, break it into focused functions but include ALL code

2. **Analysis Before Action**
   - Before writing code, analyze all relevant files thoroughly
   - State your understanding and approach
   - Rate your confidence (1-10) before major changes
   - Ask questions if requirements are unclear

3. **Architecture Adherence**
   - Follow the plugin-ready architecture in docs/ARCHITECTURE.md
   - Keep framework-specific code isolated in plugin adapters
   - Maintain clean separation: manifest (data) vs UI (presentation)
   - Follow the two-tier expression system (sandboxed vs. full power)

4. **Code Quality Standards**
   - Write TypeScript for all application code
   - Include comprehensive JSDoc comments
   - Follow functional programming principles
   - Use meaningful names
   - Include error handling and validation
   - Write unit tests for core logic

5. **Security First**
   - Expression sandboxing is CRITICAL - never bypass
   - Validate all user input
   - Use proper IPC patterns in Electron
   - Store sensitive data in system keychain
   - Never expose Node.js APIs to untrusted contexts

6. **Documentation Requirements**
   - Update docs when making architectural changes
   - Add comments explaining complex logic
   - Include usage examples
   - Keep README and DOCUMENTATION_INDEX.md in sync

7. **AI Integration Philosophy**
   - Rise is a COPILOT, not autopilot
   - Always provide options, never force decisions
   - Track authorship (user vs. AI)
   - Make AI suggestions reviewable and rejectable

8. **Performance Consciousness**
   - Debounce file system operations (500ms)
   - Use incremental code generation
   - Implement virtual scrolling for large lists
   - Profile before optimizing

## Project Patterns

### Manifest Management
- All state in `.lowcode/manifest.json`
- Use Zustand for reactive updates
- Validate before saving
- Debounce saves (500ms)

### Code Generation
- Generate in worker threads
- Use Babel for AST manipulation
- Include comment markers
- Preserve user edits

### Error Handling
- Use Result<T, Error> types
- User-friendly messages
- Include debugging context
- Log to file

## Confidence Checks

- 9-10: Proceed
- 7-8: Proceed but flag for review
- 4-6: Ask questions first
- 1-3: Request human guidance

## File Organization

```
rise/
├── src/
│   ├── main/       # Electron main
│   ├── renderer/   # React UI
│   ├── core/       # Manifest, codegen
│   ├── plugins/    # Framework adapters
│   └── utils/      # Shared utilities
├── docs/
├── tests/
└── .lowcode/
```

## Workflow

1. Read relevant docs
2. Analyze existing code
3. State implementation plan
4. Break into chunks
5. Implement complete code
6. Test
7. Update docs
8. Summarize
```

---

## 📋 Project .clinerules

**Create this file: `.clinerules` in project root:**

```markdown
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
```

---

## 📅 Phase-by-Phase Task Breakdown

### Phase 1: Foundation (Weeks 1-2)

#### Task 1.1: Electron + React Boilerplate
**Duration**: 1 day | **AI Confidence**: 8+

**Prompt:**
```
Set up Electron 28+ with React 18+ and TypeScript boilerplate for Rise.

Requirements:
1. Electron 28+, React 18+, TypeScript
2. electron-builder for packaging
3. Vite for development
4. Three-panel layout (component tree | preview | properties)
5. IPC communication setup
6. Window state persistence

Review @docs/ARCHITECTURE.md and @docs/FILE_STRUCTURE_SPEC.md

State confidence (1-10) and approach before implementing.
DO NOT OMIT ANY CODE.
```

**Success Criteria:**
- [ ] App launches
- [ ] Three panels render
- [ ] Hot reload works
- [ ] TypeScript compiles
- [ ] Window state persists

**Human Checkpoint:** None

---

#### Task 1.2: Project Creation System
**Duration**: 1.5 days | **AI Confidence**: 8+

**Prompt:**
```
Implement project creation and management.

Features:
1. "New Project" dialog (name, location, framework, TypeScript toggle)
2. Create Vite + React structure
3. Generate `.lowcode/` with manifest.json
4. Recent projects list
5. "Open Project" functionality
6. Project validation

Reference @docs/FILE_STRUCTURE_SPEC.md and @docs/COMPONENT_SCHEMA.md

Rate confidence. Ask if schema structure unclear.
```

**Success Criteria:**
- [ ] Creates React project
- [ ] Generates correct manifest.json
- [ ] Recent projects stored
- [ ] Opens existing projects
- [ ] Shows helpful errors

**Human Checkpoint:** ✅ Architecture Review
- Validate manifest structure
- Review file system error handling
- Check security

---

#### Task 1.3: Manifest Manager Core
**Duration**: 2 days | **AI Confidence**: 7+

**Prompt:**
```
Implement Manifest Manager - single source of truth for component state.

Requirements:
1. TypeScript interfaces (Component, Property, GlobalFunction, etc.)
2. Zustand store for reactive state
3. CRUD operations:
   - loadManifest(path), saveManifest() [debounced 500ms]
   - validateManifest(), addComponent(), removeComponent()
   - updateComponent(), getComponent(), getComponentTree()
4. Validation: no circular deps, valid types, required fields, unique IDs
5. Detailed error handling

Reference @docs/COMPONENT_SCHEMA.md thoroughly.

Analyze schema, state plan, rate confidence 1-10.
```

**Success Criteria:**
- [ ] TypeScript interfaces complete
- [ ] Zustand store works
- [ ] CRUD operations function
- [ ] Validation catches errors
- [ ] Debounced saves work
- [ ] Unit tests pass

**Human Checkpoint:** ✅ Code Review
- Verify validation logic
- Check race conditions
- Review error patterns

---

#### Task 1.4: Component Tree UI
**Duration**: 2 days | **AI Confidence**: 8+

**Prompt:**
```
Implement visual component tree navigator with react-arborist.

Features:
1. Tree rendering from manifest
2. Drag-and-drop reordering
3. Context menu (add, duplicate, delete, copy/paste)
4. Single/multi selection
5. Visual indicators (AI-generated, errors, user-modified)
6. Search/filter
7. Keyboard shortcuts (Delete, Cmd/Ctrl+D, Cmd/Ctrl+C/V)

Connect to Manifest Manager's Zustand store.

State approach and confidence level.
```

**Success Criteria:**
- [ ] Tree renders correctly
- [ ] Drag-and-drop smooth
- [ ] Context menu works
- [ ] Selection managed
- [ ] Visual indicators show
- [ ] Keyboard shortcuts work

**Human Checkpoint:** ✅ UX Review
- Test drag-and-drop feel
- Verify shortcuts intuitive
- Check accessibility

---

### Phase 2: Property Editing + Expressions (Weeks 3-4)

#### Task 2.1: Property Panel UI
**Duration**: 2 days | **AI Confidence**: 8+

**Prompt:**
```
Implement properties panel for selected component editing.

Requirements:
1. Dynamic form based on component type
2. Input types (text, number, boolean, dropdown, color, expression toggle)
3. Property grouping (basics, styling, events, advanced)
4. "Add Custom Property"
5. Inline validation/errors
6. Help tooltips
7. AI suggestion button per property

Connect to Manifest Manager for read/write.

Reference @docs/COMPONENT_SCHEMA.md and @docs/EXPRESSION_SYSTEM.md

State plan and confidence.
```

**Success Criteria:**
- [ ] Panel displays for selected component
- [ ] All input types work
- [ ] Grouping is clear
- [ ] Validation shows errors
- [ ] Real-time manifest updates
- [ ] Custom properties work

**Human Checkpoint:** ✅ UX Review
- Test usability
- Verify helpful tooltips
- Check responsive layout

---

#### Task 2.2: Simple Expression Editor (Tier 1)
**Duration**: 2.5 days | **AI Confidence**: 7+

**Prompt:**
```
Implement sandboxed expression editor for Tier 1 expressions.

Requirements:
1. Monaco editor with JavaScript syntax
2. Context-aware autocomplete (props.*, state.*, global.*)
3. Real-time validation
4. Safe evaluation (no fetch, localStorage, DOM, network)
5. Helpful error messages
6. Expression preview
7. Dependency tracking

CRITICAL: Secure sandboxing. Reference @docs/SECURITY.md and @docs/EXPRESSION_SYSTEM.md

State security approach and confidence. Ask for review if < 8.
```

**Success Criteria:**
- [ ] Monaco integrates
- [ ] Autocomplete helpful
- [ ] Catches unsafe operations
- [ ] Evaluates correctly
- [ ] Clear errors
- [ ] Tracks dependencies
- [ ] Sandbox secure

**Human Checkpoint:** ✅ **CRITICAL** Security Audit
- Test sandbox escapes
- Review whitelist/blacklist
- Verify no side effects
- Test malicious expressions

---

#### Task 2.3: Custom Function Editor (Tier 2)
**Duration**: 2 days | **AI Confidence**: 7+

**Prompt:**
```
Implement custom function editor for Tier 2 (full JavaScript power).

Requirements:
1. Full Monaco editor
2. Function signature (params, return type, description)
3. Function management (create/edit/delete, usage tracking, testing)
4. Trigger system (onAppMount, onComponentMount, onGlobalStateChange)
5. Security warnings (fetch, localStorage, etc.)
6. AI assistance (generate, suggest, review)

Reference @docs/EXPRESSION_SYSTEM.md and @docs/COMPONENT_SCHEMA.md

State confidence and plan.
```

**Success Criteria:**
- [ ] Full JavaScript works
- [ ] Signatures defined
- [ ] Triggers function
- [ ] Usage tracking works
- [ ] Security warnings display
- [ ] AI generation useful

**Human Checkpoint:** ✅ Security Review
- Review warning system
- Test trigger isolation
- Verify scoping

---

#### Task 2.4: Expression Integration
**Duration**: 1.5 days | **AI Confidence**: 8+

**Prompt:**
```
Integrate expression editors into property panel.

Requirements:
1. "Expression" toggle per property
2. Switch static ↔ expression
3. Type indicator (simple vs custom function)
4. Inline validation
5. Quick templates (common patterns)
6. Visual dependency graph

Connect previous editors to property panel.

State approach and confidence.
```

**Success Criteria:**
- [ ] Toggle works smoothly
- [ ] Editors integrate
- [ ] Templates helpful
- [ ] Dependencies visualized
- [ ] Updates trigger saves

**Human Checkpoint:** None

---

### Phase 3: Code Generation + Preview (Weeks 5-6)

#### Task 3.1: Plugin Interface Definition
**Duration**: 1 day | **AI Confidence**: 7+

**Prompt:**
```
Define FrameworkPlugin interface (not implementing plugins, just interface).

Requirements:
1. TypeScript interface
2. Methods: generateComponent, parseComponent, getProjectTemplate, getDevDependencies, validateComponent
3. ReactPlugin implementing interface
4. Plugin registry system
5. Documentation

Reference @docs/PLUGIN_SYSTEM.md

Analyze requirements, state approach, confidence level?
```

**Success Criteria:**
- [ ] Interface comprehensive
- [ ] ReactPlugin implements all
- [ ] Extensible for Vue/Svelte
- [ ] Registry in place
- [ ] Docs clear

**Human Checkpoint:** ✅ Architecture Review
- Validate interface design
- Ensure future compatibility
- Review extensibility

---

#### Task 3.2: React Code Generator
**Duration**: 3 days | **AI Confidence**: 8+

**Prompt:**
```
Implement React code generator (ReactPlugin) transforming manifest to clean React code.

Requirements:
1. Component generation (functional + hooks, TypeScript optional, PropTypes, imports)
2. Expression handling (simple → useMemo, custom → import/call, state → useState, props → params)
3. Event handlers (onClick, onChange, navigate, custom)
4. Styling (className, conditional, Tailwind)
5. Code quality (ESLint-compliant, Prettier, comments, markers)
6. Optimization (dependency arrays, memoization, tree-shakeable)

Reference @docs/COMPONENT_SCHEMA.md, @docs/ARCHITECTURE.md, @docs/EXAMPLES.md

Complex task - state plan and confidence, ask questions if needed.
```

**Success Criteria:**
- [ ] Generates valid React
- [ ] All property types translate
- [ ] Expressions integrate
- [ ] Passes ESLint
- [ ] Well-formatted and commented
- [ ] TypeScript works
- [ ] Unit tests pass

**Human Checkpoint:** ✅ Code Quality Review
- Review examples
- Verify best practices
- Check edge cases

---

#### Task 3.3: Project File Management
**Duration**: 1.5 days | **AI Confidence**: 8+

**Prompt:**
```
Implement file system management for generated projects.

Requirements:
1. Write components to src/components/
2. Update package.json
3. Generate support files (globalFunctions.js, globalState.js, App.jsx)
4. File watching (chokidar, distinguish tool vs user edits, pause during generation)
5. Conflict resolution (detect user modifications, prompt before overwrite, preserve user edits)
6. Incremental generation (only changed components, track mod times)

Reference @docs/FILE_STRUCTURE_SPEC.md

Rate confidence, state approach.
```

**Success Criteria:**
- [ ] Files in correct locations
- [ ] package.json updates
- [ ] Support files generate
- [ ] Watcher detects changes
- [ ] User edits preserved
- [ ] Incremental works

**Human Checkpoint:** ✅ Testing
- Test manual edits
- Verify conflict resolution
- Check incremental performance

---

#### Task 3.4: Live Preview System
**Duration**: 2 days | **AI Confidence**: 8+

**Prompt:**
```
Implement live preview with Vite dev server.

Requirements:
1. Vite server management (start, stop, auto-restart)
2. Preview iframe (embedded webview, security sandboxing, error boundary)
3. Hot module replacement (instant updates, preserve state, error overlay)
4. Viewport controls (responsive modes, zoom, refresh)
5. Console integration (show console.log, errors/warnings, click to jump to component)

State approach and confidence.
```

**Success Criteria:**
- [ ] Vite server lifecycle works
- [ ] Preview iframe displays
- [ ] HMR instant updates
- [ ] Viewport controls function
- [ ] Console logs appear
- [ ] Error handling robust

**Human Checkpoint:** ✅ Performance Testing
- Test large projects
- Verify HMR performance
- Check memory usage

---

### Phase 4: AI Integration + Polish (Weeks 7-8)

#### Task 4.1: AI API Integration
**Duration**: 1.5 days | **AI Confidence**: 9+

**Prompt:**
```
Implement AI API integration (Claude/OpenAI).

Requirements:
1. API client (Anthropic Claude, OpenAI fallback, keychain storage, rate limiting/retries)
2. Prompt engineering (component generation, code review, expression suggestions, function generation)
3. Response parsing (extract code from markdown, validate manifest, error handling)
4. User feedback loop (accept/reject, track acceptance rate, learn preferences)
5. Privacy mode (disable AI, local-only, data retention settings)

State plan and confidence.
```

**Success Criteria:**
- [ ] API client connects
- [ ] Keys stored securely
- [ ] Prompts generate useful responses
- [ ] Parsing robust
- [ ] Feedback tracked
- [ ] Privacy mode works

**Human Checkpoint:** ✅ Security Audit
- Verify key storage
- Review data sent to AI
- Check privacy mode

---

#### Task 4.2: AI Component Generation
**Duration**: 2 days | **AI Confidence**: 8+

**Prompt:**
```
Implement AI-powered component generation from natural language.

Requirements:
1. Natural language input (description, context, styling preferences)
2. AI generation (complete manifest, property bindings, event handlers, styling)
3. Preview and edit (show generated, allow editing, suggest improvements)
4. Multi-step refinement (ask for modifications, adjust based on feedback, track history)
5. Templates (learn from existing, suggest patterns, reuse conventions)

Reference @docs/COMPONENT_SCHEMA.md

State approach and confidence.
```

**Success Criteria:**
- [ ] Natural language works
- [ ] Generated components functional
- [ ] Preview shows result
- [ ] Refinement iterations work
- [ ] AI learns from context

**Human Checkpoint:** ✅ Quality Review
- Test various prompts
- Verify code quality
- Check context learning

---

#### Task 4.3: AI Code Review System
**Duration**: 1.5 days | **AI Confidence**: 8+

**Prompt:**
```
Implement AI code review and suggestions.

Requirements:
1. Automatic analysis (run on save, analyze performance/security/accessibility/best practices)
2. Suggestion UI (inline suggestions, explanations, one-click fixes, dismiss/ignore)
3. Review categories (performance, security, accessibility, code quality)
4. Learning system (track accepted/rejected, adjust future suggestions, user profiles)

State approach and confidence.
```

**Success Criteria:**
- [ ] Analysis runs automatically
- [ ] Suggestions helpful and relevant
- [ ] One-click fixes work
- [ ] All categories covered
- [ ] Learning improves over time

**Human Checkpoint:** None

---

#### Task 4.4: UX Polish & Accessibility
**Duration**: 3 days | **AI Confidence**: 6+ (needs human guidance)

**Prompt:**
```
Implement UX improvements and accessibility.

Requirements:
1. Keyboard shortcuts (comprehensive system, customizable bindings, cheat sheet)
2. Accessibility (ARIA labels, keyboard navigation, screen reader support, high contrast mode)
3. User onboarding (welcome screen, interactive tutorial, sample projects, tooltip system)
4. Error handling (user-friendly messages, recovery suggestions, error reporting)
5. Performance feedback (loading indicators, progress bars, background task notifications)

This requires human UX expertise. Implement basics, flag for human polish.

State what you can implement confidently and what needs human review.
```

**Success Criteria:**
- [ ] Keyboard shortcuts work throughout
- [ ] Fully keyboard navigable
- [ ] Screen reader announces actions
- [ ] Onboarding guides new users
- [ ] Helpful error messages
- [ ] Clear loading states

**Human Checkpoint:** ✅ **CRITICAL** UX/Accessibility Review
- Complete accessibility audit
- User testing with screen readers
- Keyboard navigation testing
- Onboarding flow testing

---

### Phase 5: Testing + Release (Weeks 9-10)

#### Task 5.1: Unit Test Suite
**Duration**: 2.5 days | **AI Confidence**: 8+

**Prompt:**
```
Implement comprehensive unit tests.

Requirements:
1. Test framework (Vitest, React Testing Library, coverage reporting)
2. Core tests (Manifest Manager, expression parsing/validation, code generation, plugin interface)
3. Test utilities (mock manifest generator, component factory, expression helpers)
4. Coverage goals (80%+ overall, 100% for critical paths)
5. CI integration (GitHub Actions, pre-commit hooks, automated testing)

Reference @docs/TESTING_STRATEGY.md

State testing strategy and confidence.
```

**Success Criteria:**
- [ ] Unit tests cover core logic
- [ ] Tests pass consistently
- [ ] 80%+ coverage achieved
- [ ] CI pipeline runs tests
- [ ] Pre-commit hooks work

**Human Checkpoint:** ✅ Test Review
- Review coverage
- Identify untested edge cases
- Verify critical paths tested

---

#### Task 5.2: Integration Tests
**Duration**: 2 days | **AI Confidence**: 7+

**Prompt:**
```
Implement integration tests for complete workflows.

Requirements:
1. Workflow tests (create → add components → generate → preview; expression editing → save → regenerate; AI generation → review → accept/modify; file editing → sync → manifest update)
2. Test setup (Playwright E2E, mock file system, mock AI API)
3. Data-driven tests (various project sizes, component types, complex expressions)
4. Performance tests (measure generation time, monitor memory, check responsiveness)

Reference @docs/TESTING_STRATEGY.md

State approach and confidence.
```

**Success Criteria:**
- [ ] Complete workflows tested
- [ ] Tests run reliably
- [ ] Performance benchmarks pass
- [ ] Edge cases covered

**Human Checkpoint:** ✅ Test Execution
- Run full suite manually
- Verify tests catch real bugs
- Test on different platforms

---

#### Task 5.3: Security Audit & Testing
**Duration**: 2 days | **AI Confidence**: 5+ (requires human security expert)

**Prompt:**
```
Implement security testing for expression sandboxing and code execution.

Requirements:
1. Sandbox escape tests (forbidden API access, dangerous code execution, injection attacks)
2. XSS prevention tests (input sanitization, output encoding, DOM-based XSS)
3. IPC security tests (renderer/main API access, message validation, privilege escalation)
4. Dependency scanning (vulnerable packages, update monitoring, security advisories)

IMPORTANT: Requires human security expertise. Implement automated tests, flag for manual audit.

State what security tests you can implement and what needs human expert review.
```

**Success Criteria:**
- [ ] Automated security tests pass
- [ ] Sandbox prevents escapes
- [ ] XSS prevention works
- [ ] IPC security validated
- [ ] Dependencies scanned

**Human Checkpoint:** ✅ **CRITICAL** Security Audit
- Manual penetration testing
- Security expert review
- Third-party audit if possible

---

#### Task 5.4: Performance Optimization
**Duration**: 2 days | **AI Confidence**: 7+

**Prompt:**
```
Implement performance optimizations and profiling.

Requirements:
1. Performance profiling (React DevTools, Chrome DevTools, identify bottlenecks)
2. Optimizations (virtual scrolling for large lists, worker threads for generation, debouncing, memoization)
3. Memory management (leak detection, cleanup, resource disposal)
4. Benchmarks (generation time < 1s, preview update < 500ms, app start < 3s)
5. Performance monitoring (track metrics, alert on regressions)

Reference @docs/PERFORMANCE.md

State approach and confidence.
```

**Success Criteria:**
- [ ] Profiling identifies bottlenecks
- [ ] Optimizations implemented
- [ ] No memory leaks
- [ ] Benchmarks met
- [ ] Monitoring in place

**Human Checkpoint:** ✅ Performance Review
- Validate optimization effectiveness
- Test with realistic data
- Verify benchmarks on multiple machines

---

#### Task 5.5: Release Preparation
**Duration**: 2 days | **AI Confidence**: 8+

**Prompt:**
```
Prepare for production release.

Requirements:
1. User documentation (usage guide, API docs, troubleshooting, FAQs)
2. Sample projects (example projects, templates, tutorials)
3. Error tracking (Sentry integration, analytics, crash reporting)
4. Distribution (electron-builder setup, auto-updates, installers for Mac/Windows/Linux)
5. Release notes (changelog, features, known issues, migration guide)

State approach and confidence.
```

**Success Criteria:**
- [ ] Documentation complete and helpful
- [ ] Sample projects work
- [ ] Error tracking configured
- [ ] Distribution builds successfully
- [ ] Release notes comprehensive

**Human Checkpoint:** ✅ Final Release Review
- Review all documentation
- Test installers on all platforms
- Verify auto-update works

---

## 🎯 Task Prompt Templates

### General Template

```
[Task Title]

Requirements:
1. [Requirement 1]
2. [Requirement 2]
...

Reference @docs/[relevant docs]

Before implementing:
- State your understanding of the task
- Outline your implementation approach
- Rate your confidence (1-10)
- Ask clarifying questions if needed

DO NOT OMIT ANY CODE. Provide complete implementations.
```

### Security-Critical Template

```
[Task Title]

Requirements:
[requirements list]

⚠️ CRITICAL SECURITY TASK

Reference @docs/SECURITY.md and [other relevant docs]

Before implementing:
1. State your security approach
2. List potential vulnerabilities
3. Describe mitigation strategies
4. Rate confidence (1-10)
5. If confidence < 8, request human security expert review

This task will undergo mandatory security audit by human expert.
```

### Complex Integration Template

```
[Task Title]

This integrates [Component A] with [Component B].

Requirements:
[requirements list]

Reference @docs/[relevant docs]

Before implementing:
1. Analyze both components thoroughly
2. Identify integration points
3. State your integration strategy
4. List potential issues and solutions
5. Rate confidence (1-10)

Test thoroughly with edge cases.
```

---

## 👥 Human Review Checkpoints

### Required Human Reviews

| Phase | Task | Review Type | Estimated Time |
|-------|------|-------------|----------------|
| 1 | Project Creation | Architecture | 1 hour |
| 1 | Manifest Manager | Code Review | 2 hours |
| 1 | Component Tree UI | UX Review | 1 hour |
| 2 | Property Panel | UX Review | 1 hour |
| **2** | **Simple Expression Editor** | **Security Audit** | **4 hours** |
| 2 | Custom Function Editor | Security Review | 2 hours |
| 3 | Plugin Interface | Architecture Review | 2 hours |
| 3 | React Generator | Code Quality | 3 hours |
| 3 | File Management | Testing | 2 hours |
| 3 | Live Preview | Performance | 2 hours |
| 4 | AI API Integration | Security Audit | 2 hours |
| 4 | AI Component Gen | Quality Review | 2 hours |
| **4** | **UX & Accessibility** | **UX/A11y Audit** | **6 hours** |
| 5 | Unit Tests | Test Review | 2 hours |
| 5 | Integration Tests | Test Execution | 3 hours |
| **5** | **Security Testing** | **Security Audit** | **6 hours** |
| 5 | Performance | Performance Review | 3 hours |
| 5 | Release Prep | Final Review | 4 hours |

**Total Human Time**: ~46 hours (~15% of project)

### Review Checklists

#### Architecture Review Checklist
- [ ] Follows plugin-ready design patterns
- [ ] Clean separation of concerns
- [ ] Extensible for future features
- [ ] Proper TypeScript types
- [ ] Error handling comprehensive

#### Security Audit Checklist
- [ ] Sandbox prevents all escape attempts
- [ ] No XSS vulnerabilities
- [ ] IPC communication secure
- [ ] API keys stored securely
- [ ] User data protected

#### UX Review Checklist
- [ ] Intuitive user flows
- [ ] Keyboard navigation complete
- [ ] Screen reader compatible
- [ ] Error messages helpful
- [ ] Loading states clear

#### Code Quality Checklist
- [ ] Passes ESLint without warnings
- [ ] Formatted with Prettier
- [ ] Comprehensive comments
- [ ] Handles edge cases
- [ ] Unit tests written

---

## 📊 Context Management Strategy

### Managing Claude's Context Window

**Context Limit**: 200K tokens  
**Typical Task**: 10-30K tokens  
**Strategy**: Keep tasks focused and self-contained

### Per-Task Context Pattern

```
1. Start fresh task in new conversation
2. Load only relevant documentation:
   - @docs/ARCHITECTURE.md (always)
   - @docs/[specific feature doc]
   - @README.md (if needed)
3. Reference previous work via summaries, not full code
4. Use task_progress to track completion
5. Summarize results for next task
```

### Documentation Reference Priority

| Always Include | Sometimes Include | Rarely Include |
|----------------|-------------------|----------------|
| ARCHITECTURE.md | EXAMPLES.md | GETTING_STARTED.md |
| COMPONENT_SCHEMA.md | TESTING_STRATEGY.md | PERFORMANCE.md |
| [Task-specific doc] | FILE_STRUCTURE_SPEC.md | SECURITY.md (unless security task) |

### Context-Saving Techniques

1. **Summaries Over Full Code**: Reference implementations via summaries
2. **Incremental Loading**: Load docs as needed, not all upfront
3. **Task Isolation**: Each task should be independently understandable
4. **Clear Handoffs**: End each task with summary for next task

---

## ✅ Quality Assurance Guidelines

### Code Quality Standards

**TypeScript:**
- Strict mode enabled
- No `any` types (use `unknown` when necessary)
- Comprehensive interfaces
- Type guards for runtime checks

**React:**
- Functional components only
- Custom hooks for shared logic
- Proper dependency arrays
- Error boundaries

**Testing:**
- 80%+ code coverage
- 100% coverage for security-critical code
- Integration tests for workflows
- E2E tests for critical user flows

### Performance Benchmarks

| Metric | Target | Max Acceptable |
|--------|--------|----------------|
| App startup | < 2s | 3s |
| Component generation | < 500ms | 1s |
| Preview update (HMR) | < 300ms | 500ms |
| Manifest save | < 100ms | 200ms |
| Large project (100+ components) | Responsive | No freezing |

### Security Requirements

- Expression sandbox: 100% secure (zero escapes allowed)
- XSS prevention: All user input sanitized
- IPC security: Renderer has no direct main process access
- API keys: Stored in system keychain only
- Dependencies: No known vulnerabilities (run `npm audit`)

---

## 🎓 Best Practices Summary

### For Cline Prompts

✅ **DO:**
- Provide complete context (@mention relevant docs)
- Ask for confidence ratings
- Request analysis before implementation
- Break complex tasks into steps
- Include success criteria
- Specify "DO NOT OMIT CODE"

❌ **DON'T:**
- Assume Cline remembers previous conversations
- Give vague requirements
- Skip testing verification
- Ignore security considerations
- Accept truncated code

### For Human Reviews

✅ **DO:**
- Review all security-critical code manually
- Test with edge cases
- Verify accessibility
- Check cross-platform compatibility
- Document findings

❌ **DON'T:**
- Rush security audits
- Skip UX testing with real users
- Ignore performance under load
- Accept "it works on my machine"

---

## 📈 Progress Tracking

### Weekly Milestones

**Week 1**: Electron app + project management  
**Week 2**: Manifest manager + component tree  
**Week 3**: Property panel + simple expressions  
**Week 4**: Custom functions + expression integration  
**Week 5**: Plugin interface + React generator  
**Week 6**: File management + live preview  
**Week 7**: AI integration + component generation  
**Week 8**: Code review + UX polish  
**Week 9**: Unit tests + integration tests  
**Week 10**: Security audit + release prep

### Success Indicators

- [ ] All Phase 1 tasks complete (Week 2)
- [ ] Expression system security audited (Week 4)
- [ ] Code generation working (Week 6)
- [ ] AI integration functional (Week 8)
- [ ] All tests passing (Week 9)
- [ ] Production-ready build (Week 10)

---

## 🚀 Getting Started

### Day 1: Setup

1. Copy custom instructions to Cline
2. Create `.clinerules` file
3. Review all documentation
4. Start Task 1.1: Electron boilerplate

### First Week Goals

- Working Electron app
- Can create/open projects
- Manifest manager operational
- Component tree displays

### First Month Goals

- Complete Phases 1-2
- Expression system working
- Security audits passed
- Foundation solid for Phase 3

---

## 📞 Support & Resources

### When to Ask for Human Help

- Confidence < 7 on any task
- Security concerns
- Architecture decisions
- Performance issues
- UX/accessibility questions
- Complex bugs

### Documentation Quick Links

- [Architecture](./docs/ARCHITECTURE.md)
- [Component Schema](./docs/COMPONENT_SCHEMA.md)
- [MVP Roadmap](./docs/MVP_ROADMAP.md)
- [Security Model](./docs/SECURITY.md)
- [Testing Strategy](./docs/TESTING_STRATEGY.md)

---

**Ready to build Rise! 🚀**

**Next Step**: Toggle to Act mode and start with Task 1.1: Electron + React Boilerplate

---

*Document Version*: 1.0  
*Last Updated*: October 25, 2025  
*Optimized for*: Claude Sonnet 4.5 via Cline
