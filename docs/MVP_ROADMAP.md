# MVP Roadmap

## Vision & Scope

**Goal**: Build a functional Electron-based visual low-code builder that can generate React components with AI assistance, providing a solid foundation for future expansion.

**Target MVP Timeline**: 12-16 weeks (with AI assistance via Cline/Claude)

**Success Criteria**:
- ✅ Can create new React project
- ✅ Can add/edit components visually
- ✅ Can set properties and create connections
- ✅ Generates clean, working React code
- ✅ Basic preview functionality
- ✅ AI assists with component generation

---

## Development Approach

### AI vs Human Split

**AI/Cline Can Handle (80% of MVP)**:
- ✅ Electron app boilerplate and setup
- ✅ Basic React UI components (panels, trees, forms)
- ✅ Monaco editor integration
- ✅ File system operations (read/write/watch)
- ✅ JSON manifest management (CRUD operations)
- ✅ Simple code generation (template-based)
- ✅ Vite project scaffolding
- ✅ Basic IPC communication
- ✅ UI styling with Tailwind
- ✅ Form validation and state management

**Human Developer Needed (20% of MVP)**:
- 🔨 Complex AST parsing (for bidirectional sync - post-MVP)
- 🔨 Advanced debugging runtime architecture
- 🔨 Performance optimization for large projects
- 🔨 Robust error handling edge cases
- 🔨 Plugin system architecture decisions
- 🔨 Security considerations and review
- 🔨 UX refinement and polish
- 🔨 Testing strategy and implementation

**Strategy**: Start with AI doing bulk of implementation, bring in human developer for architectural reviews and complex features.

---

## Phase 1: Foundation (Weeks 1-3)

### Goals
- Working Electron app shell
- Basic UI layout
- Project creation and loading

### Features

#### 1.1 Electron App Setup
**Status**: Can be done with AI
**Estimate**: 3-4 days

- [ ] Electron boilerplate with React
- [ ] Main/renderer process structure
- [ ] IPC communication setup
- [ ] Window management (resize, minimize, close)
- [ ] Menu bar and shortcuts

**Tools**: Cline + Electron Forge

---

#### 1.2 Basic UI Layout
**Status**: Can be done with AI
**Estimate**: 4-5 days

- [ ] Three-panel layout (Navigator | Editor | Properties)
- [ ] Resizable panels
- [ ] Tab system for Editor panel
- [ ] Toolbar with basic actions
- [ ] Status bar

**Tools**: Cline + React + Tailwind

---

#### 1.3 Project Management
**Status**: Can be done with AI
**Estimate**: 4-5 days

- [ ] Create new project wizard
- [ ] Framework selection (React only for MVP)
- [ ] Project templates
- [ ] Load existing project
- [ ] Recent projects list
- [ ] Project settings panel

**Tools**: Cline + Node.js fs

---

#### 1.4 File System Operations
**Status**: Can be done with AI
**Estimate**: 3-4 days

- [ ] Create `.lowcode/` directory structure
- [ ] Generate initial manifest.json
- [ ] Scaffold Vite + React project
- [ ] Install dependencies (npm install)
- [ ] File watcher setup (chokidar)

**Tools**: Cline + chokidar + Node.js

---

### Phase 1 Deliverable

```
✅ Working Electron app that can:
   • Create new React/Vite project
   • Load existing projects
   • Display basic UI panels
   • Watch for file changes
```

**Total Estimate**: 2-3 weeks with AI assistance

---

## Phase 2: Component Management (Weeks 4-6)

### Goals
- Component tree navigation
- Add/edit/delete components
- Basic property editing
- Simple manifest management

### Features

#### 2.1 Component Tree View
**Status**: Can be done with AI
**Estimate**: 5-6 days

- [ ] Tree view of component hierarchy
- [ ] Expand/collapse nodes
- [ ] Select component (highlights in editor)
- [ ] Drag-drop to reorder (basic)
- [ ] Context menu (add, delete, duplicate)
- [ ] Search/filter components

**Tools**: Cline + react-arborist

---

#### 2.2 Component Inspector
**Status**: Can be done with AI
**Estimate**: 4-5 days

- [ ] Properties panel for selected component
- [ ] Edit component name and ID
- [ ] List of props with types
- [ ] List of state variables
- [ ] List of children
- [ ] Metadata display

**Tools**: Cline + React forms

---

#### 2.3 Property Editor
**Status**: Can be done with AI
**Estimate**: 6-7 days

- [ ] Static value input (text, number, boolean)
- [ ] Expression editor (Monaco-based)
- [ ] Auto-completion (basic)
- [ ] Type validation
- [ ] Dropdown for enums
- [ ] Toggle between static/expression

**Tools**: Cline + Monaco Editor

---

#### 2.4 Manifest CRUD Operations
**Status**: Can be done with AI
**Estimate**: 4-5 days

- [ ] Add component to manifest
- [ ] Update component properties
- [ ] Delete component (with children)
- [ ] Move component in tree
- [ ] Duplicate component
- [ ] Validate manifest on save

**Tools**: Cline + JSON validation

---

#### 2.5 AI Component Generation
**Status**: Can be done with AI
**Estimate**: 5-6 days

- [ ] AI prompt input field
- [ ] Send prompt to Claude API
- [ ] Parse AI response into manifest format
- [ ] Add generated component to tree
- [ ] Preview generated code
- [ ] Iterate with AI if needed

**Tools**: Cline + Anthropic API

---

### Phase 2 Deliverable

```
✅ Working visual editor that can:
   • Display component tree
   • Add/edit/delete components
   • Set properties with type validation
   • Use AI to generate components
   • Save changes to manifest.json
```

**Total Estimate**: 3-4 weeks with AI assistance

---

## Phase 3: Code Generation & Preview (Weeks 7-9)

### Goals
- Generate React code from manifest
- Preview components in isolation
- Preview full app
- Hot reload support

### Features

#### 3.1 React Code Generator
**Status**: Can be done with AI
**Estimate**: 6-7 days

- [ ] Component code generation (JSX)
- [ ] Props interface generation
- [ ] State hooks generation (useState)
- [ ] Event handler generation
- [ ] Import statement generation
- [ ] Comment markers (@lowcode:generated)

**Tools**: Cline + Template strings

---

#### 3.2 File Generation
**Status**: Can be done with AI
**Estimate**: 3-4 days

- [ ] Write components to `src/components/`
- [ ] Generate `src/App.jsx`
- [ ] Generate `src/main.jsx`
- [ ] Update on manifest changes
- [ ] Preserve user edits (basic)

**Tools**: Cline + Node.js fs

---

#### 3.3 Component Isolation View
**Status**: Can be done with AI
**Estimate**: 5-6 days

- [ ] Render selected component in iframe
- [ ] Provide mock props
- [ ] Hot reload on changes
- [ ] Error boundary for crashes
- [ ] Responsive viewport controls

**Tools**: Cline + React + iframe

---

#### 3.4 Full App Preview
**Status**: Can be done with AI
**Estimate**: 6-7 days

- [ ] Start Vite dev server
- [ ] Embed in Electron webview
- [ ] Communication bridge (IPC)
- [ ] Reload on file changes
- [ ] Error display
- [ ] Console log capture

**Tools**: Cline + Vite + Electron webview

---

#### 3.5 Global State Setup
**Status**: Can be done with AI
**Estimate**: 4-5 days

- [ ] Generate `runtime/globalState.js` from `variables.json`
- [ ] Zustand store creation
- [ ] Hook generation
- [ ] Import in components that use globals
- [ ] Default values

**Tools**: Cline + Zustand

---

### Phase 3 Deliverable

```
✅ End-to-end code generation and preview:
   • Visual changes → manifest → generated code → preview
   • Component isolation view
   • Full app preview with HMR
   • Global state management working
```

**Total Estimate**: 3-4 weeks with AI assistance

---

## Phase 4: Connections & Data Flow (Weeks 10-12)

### Goals
- Visual connection system
- Wire components together
- Expression system for dynamic data
- Basic script nodes

### Features

#### 4.1 Connection Visualization
**Status**: Can be done with AI (with guidance)
**Estimate**: 7-8 days

- [ ] React Flow integration
- [ ] Display components as nodes
- [ ] Show inputs/outputs on nodes
- [ ] Draw connections (edges)
- [ ] Connection colors by type (props, events, state)
- [ ] Save layout in connections.json

**Tools**: Cline + React Flow
**Human Help**: Architecture guidance for layout persistence

---

#### 4.2 Connection Creation
**Status**: Can be done with AI
**Estimate**: 6-7 days

- [ ] Drag from output to input
- [ ] Type checking (compatible connections)
- [ ] Multiple connections support
- [ ] Delete connections
- [ ] Edit connection properties
- [ ] Validation on save

**Tools**: Cline + React Flow

---

#### 4.3 Expression System
**Status**: Can be done with AI
**Estimate**: 5-6 days

- [ ] Monaco-based expression editor
- [ ] Context-aware auto-completion
- [ ] Available variables list
- [ ] Type validation
- [ ] Syntax highlighting
- [ ] Error indicators

**Tools**: Cline + Monaco Editor

---

#### 4.4 Script Nodes (Basic)
**Status**: Can be done with AI
**Estimate**: 6-7 days

- [ ] Create script node in tree
- [ ] Define inputs/outputs
- [ ] Monaco editor for script code
- [ ] Generate script file (`src/scripts/`)
- [ ] Import in components that use script
- [ ] Basic execution (no async yet)

**Tools**: Cline + Monaco Editor

---

### Phase 4 Deliverable

```
✅ Visual data flow:
   • Wire components together visually
   • Expression-based properties
   • Script nodes for custom logic
   • Generated code reflects connections
```

**Total Estimate**: 3-4 weeks with AI assistance

---

## Phase 5: Polish & MVP Release (Weeks 13-16)

### Goals
- Error handling
- UI/UX improvements
- Documentation
- Testing
- First release

### Features

#### 5.1 Error Handling
**Status**: Needs human review
**Estimate**: 5-6 days

- [ ] Graceful failure on invalid manifest
- [ ] Validation errors displayed clearly
- [ ] Code generation error handling
- [ ] Preview crash recovery
- [ ] User-friendly error messages

**Tools**: Cline with human review
**Human Help**: Edge case testing, error message quality

---

#### 5.2 UI Polish
**Status**: Needs human review
**Estimate**: 7-8 days

- [ ] Consistent styling
- [ ] Icons and visual feedback
- [ ] Loading states
- [ ] Animations (subtle)
- [ ] Keyboard shortcuts
- [ ] Tooltips and help text

**Tools**: Cline + designer collaboration
**Human Help**: UX review, accessibility

---

#### 5.3 User Onboarding
**Status**: Can be done with AI
**Estimate**: 4-5 days

- [ ] Welcome screen
- [ ] Quick start tutorial
- [ ] Sample projects
- [ ] Tooltips for first-time users
- [ ] Help menu with links

**Tools**: Cline + React

---

#### 5.4 Testing
**Status**: Needs human guidance
**Estimate**: 8-10 days

- [ ] Unit tests (key functions)
- [ ] Integration tests (workflows)
- [ ] E2E tests (Playwright)
- [ ] Manual test plan
- [ ] Bug fixing

**Tools**: Vitest, Playwright
**Human Help**: Testing strategy, critical path identification

---

#### 5.5 Documentation
**Status**: Can be done with AI + human
**Estimate**: 5-6 days

- [ ] User guide
- [ ] Video tutorials (if time)
- [ ] API documentation
- [ ] Troubleshooting guide
- [ ] Contributing guide

**Tools**: Cline + Markdown
**Human Help**: Technical accuracy review

---

### Phase 5 Deliverable

```
✅ MVP Release:
   • Stable, tested Electron app
   • Complete user documentation
   • Sample projects
   • Known limitations documented
   • Ready for beta users
```

**Total Estimate**: 4-5 weeks with AI + human collaboration

---

## Post-MVP Features (Future Phases)

### Phase 6: Step Debugger
- Event-level debugging
- State snapshots
- Time travel
- Breakpoints

**Estimate**: 6-8 weeks
**Needs**: Human developer for runtime instrumentation

---

### Phase 7: Bidirectional Sync
- Parse code changes
- Update manifest automatically
- Conflict resolution
- Protected regions

**Estimate**: 8-10 weeks
**Needs**: Human developer for AST parsing and AI integration

---

### Phase 8: Plugin System
- Framework plugin interface
- Vue plugin
- Svelte plugin
- Plugin marketplace

**Estimate**: 6-8 weeks
**Needs**: Human developer for architecture

---

### Phase 9: Advanced Features
- Component library imports (MUI, shadcn)
- Routing support
- API integration wizard
- Deployment pipeline
- Collaboration features

**Estimate**: 12-16 weeks
**Needs**: Mixed - some AI, some human

---

## Resource Requirements

### AI Development (Cline/Claude)
- **Availability**: Continuous throughout project
- **Usage**: Primary development tool for 80% of features
- **Best For**: UI implementation, CRUD operations, code generation, templating

### Human Developer
- **Phase 1-4**: Part-time (10-15 hours/week) - Architecture review, complex features
- **Phase 5**: Full-time (30-40 hours/week) - Testing, polish, release prep
- **Post-MVP**: Full-time for advanced features

### Skills Needed (Human)
- React/TypeScript expertise
- Electron experience
- AST parsing (Babel)
- System architecture
- Testing/QA
- UX sensibility

---

## Risk Mitigation

### Technical Risks

**Risk**: Code generation produces invalid React
**Mitigation**: 
- Start with simple templates
- Add ESLint validation
- Test with various component types
- Human review generated code patterns

**Risk**: Preview fails or crashes frequently
**Mitigation**:
- Error boundaries everywhere
- Graceful degradation
- Clear error messages
- Sandbox preview properly

**Risk**: File watching causes infinite loops
**Mitigation**:
- Debounce file events
- Track generation timestamps
- Ignore tool-generated changes
- Human review watching logic

### Scope Risks

**Risk**: Features creep, timeline extends
**Mitigation**:
- Strict MVP feature list
- Push nice-to-haves to post-MVP
- Regular scope reviews
- Time-box implementation

**Risk**: AI can't handle complexity
**Mitigation**:
- Break features into smaller tasks
- Clear specifications for AI
- Human reviews AI output
- Fall back to human for complex parts

---

## Success Metrics

### MVP Launch Criteria

✅ **Functionality**:
- Can create new React project in < 2 minutes
- Can add 10+ components without issues
- Generated code compiles without errors
- Preview loads in < 5 seconds
- AI generates usable components > 70% of time

✅ **Stability**:
- No crashes in 1-hour session
- File operations reliable
- Undo/redo works correctly
- Changes persist across restarts

✅ **UX**:
- New users can complete tutorial in < 30 minutes
- Common tasks require < 5 clicks
- Errors have clear explanations
- UI feels responsive (< 100ms interactions)

---

## Development Workflow

### Daily Process (with AI)

1. **Morning Planning** (15 min)
   - Review roadmap
   - Prioritize today's tasks
   - Break tasks into subtasks

2. **AI Development** (4-6 hours)
   - Use Cline to implement features
   - Provide clear specifications
   - Review and test AI output
   - Iterate on feedback

3. **Human Review** (1-2 hours)
   - Code review
   - Architecture validation
   - Manual testing
   - Bug fixing

4. **End of Day** (15 min)
   - Commit progress
   - Update roadmap
   - Note blockers
   - Plan tomorrow

### Weekly Process

- **Monday**: Sprint planning, prioritize features
- **Wednesday**: Mid-week review, adjust course
- **Friday**: Demo progress, retrospective

---

## Budget Estimate (Assumptions)

### AI Costs
- **Claude API**: ~$200-400/month (heavy usage)
- **Total for MVP**: ~$800-1600

### Human Developer
- **Part-time (Phases 1-4)**: ~150 hours @ $100/hr = $15,000
- **Full-time (Phase 5)**: ~160 hours @ $100/hr = $16,000
- **Total**: ~$31,000

### Tools & Services
- **Electron Forge**: Free
- **React Flow**: Free tier (add license later)
- **GitHub**: Free
- **Design tools**: Free (Figma community)
- **Total**: ~$0-200

### Grand Total MVP: ~$32,000-35,000

**If building without AI**: Likely 2-3x longer and more expensive

---

**See Also**:
- [Architecture](./ARCHITECTURE.md) - Technical implementation
- [Getting Started](./GETTING_STARTED.md) - Development setup
- [Component Schema](./COMPONENT_SCHEMA.md) - Data structures to implement