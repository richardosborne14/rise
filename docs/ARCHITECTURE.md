# Architecture Overview

## System Design Philosophy

This tool is built on three core principles:

1. **Clean Code Generation**: Output must be standard, framework-idiomatic code that any developer can read and extend
2. **Visual-First Experience**: Low-code developers should work primarily in the visual editor
3. **Bidirectional Workflow**: Changes in code or visual editor stay synchronized

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    ELECTRON DESKTOP APP                      │
├──────────────────┬──────────────────────┬───────────────────┤
│                  │                      │                   │
│  Component Tree  │   Canvas/Preview     │   Properties      │
│   Navigator      │      Editor          │     Panel         │
│                  │                      │                   │
│  - File tree     │  - Component view    │  - Property       │
│  - Visual graph  │  - Full app preview  │    editor         │
│  - Search        │  - Step debugger     │  - Connections    │
│                  │                      │  - State viewer   │
└──────────────────┴──────────────────────┴───────────────────┘
         ↓                    ↓                      ↓
┌─────────────────────────────────────────────────────────────┐
│                     CORE ENGINE                              │
├──────────────────┬──────────────────────┬───────────────────┤
│                  │                      │                   │
│   Manifest       │   Code Generator     │   File System     │
│   Manager        │                      │   Watcher         │
│                  │                      │                   │
│  - Parse JSON    │  - React compiler    │  - Monitor edits  │
│  - Validate      │  - Framework plugin  │  - Trigger sync   │
│  - Update state  │  - Optimize output   │  - Save manifest  │
└──────────────────┴──────────────────────┴───────────────────┘
         ↓                    ↓                      ↓
┌─────────────────────────────────────────────────────────────┐
│                  GENERATED PROJECT                           │
│                                                              │
│  .lowcode/              src/                  Standard       │
│  ├── manifest.json      ├── components/      Vite/React     │
│  ├── connections.json   ├── scripts/         Project        │
│  └── variables.json     └── App.jsx                         │
└─────────────────────────────────────────────────────────────┘
         ↓                                           ↓
┌──────────────────────────┐      ┌─────────────────────────┐
│   VITE DEV SERVER        │      │   AI COPILOT            │
│                          │      │                         │
│  - Hot reload            │      │  - Component generation │
│  - Debug instrumentation │      │  - Code review          │
│  - Preview webview       │      │  - Reverse engineering  │
└──────────────────────────┘      └─────────────────────────┘
```

## Technology Stack

### Desktop Application
- **Framework**: Electron 28+
- **UI**: React 18+ with TypeScript
- **State Management**: Zustand (lightweight, reactive)
- **Editor**: Monaco Editor (VSCode engine)
- **Styling**: Tailwind CSS

### Code Processing
- **Parser**: Babel (AST manipulation)
- **Generator**: Custom React code generator with framework plugins
- **Linter**: ESLint integration
- **Formatter**: Prettier integration

### Visualization
- **Component Graph**: React Flow
- **File Tree**: react-arborist
- **Preview**: Embedded Vite dev server in Electron webview

### AI Integration
- **Primary**: Anthropic Claude API (via Cline-style interaction)
- **Fallback**: OpenAI API support
- **Local**: Ollama support for offline mode (future)

### Generated Project Stack
- **Build Tool**: Vite 5+
- **Framework**: React 18+ (MVP), plugins for Vue/Svelte/Angular later
- **Routing**: React Router (optional)
- **State**: Zustand for reactive global variables
- **Styling**: Tailwind CSS + component libraries (MUI, shadcn)

## Core Components

### 1. Manifest Manager

**Responsibility**: Single source of truth for component architecture

```typescript
interface ManifestManager {
  load(projectPath: string): Promise<Manifest>;
  save(manifest: Manifest): Promise<void>;
  validate(manifest: Manifest): ValidationResult;
  update(componentId: string, changes: Partial<Component>): void;
  addComponent(parent: string, component: Component): void;
  removeComponent(componentId: string): void;
  getComponent(componentId: string): Component | null;
  getTree(): ComponentTree;
}
```

**Storage**: `.lowcode/manifest.json`

### 2. Code Generator

**Responsibility**: Transform manifest into framework-specific code

```typescript
interface CodeGenerator {
  generate(manifest: Manifest, framework: Framework): GeneratedFiles;
  compile(component: Component): string;
  optimizeImports(code: string): string;
  format(code: string): string;
}
```

**Plugin System**: Framework adapters implement `FrameworkPlugin` interface

### 3. File System Watcher

**Responsibility**: Detect manual code edits and trigger reverse engineering

```typescript
interface FileWatcher {
  watch(projectPath: string): void;
  onFileChange(path: string, callback: (diff: FileDiff) => void): void;
  isUserEdit(change: FileChange): boolean; // vs. tool-generated
  pauseWatch(): void; // During compilation
  resumeWatch(): void;
}
```

**Uses**: chokidar for file watching

### 4. Reverse Engineer

**Responsibility**: Parse code changes back into manifest updates

```typescript
interface ReverseEngineer {
  parseComponent(code: string): Component;
  detectChanges(oldCode: string, newCode: string): ComponentDiff;
  updateManifest(manifest: Manifest, diff: ComponentDiff): Manifest;
  inferConnections(component: Component): Connection[];
}
```

**Uses**: Babel AST parsing + AI assistance for ambiguous cases

### 5. Debug Runtime

**Responsibility**: Instrument generated code for step-through debugging

```typescript
interface DebugRuntime {
  instrument(code: string): string; // Add debug wrappers
  connect(webview: WebView): void; // Bridge to preview
  pause(): void;
  step(): void;
  continue(): void;
  getState(componentId: string): ComponentState;
  captureSnapshot(): DebugSnapshot;
}
```

**Implementation**: Injects `__debugWrap()` around event handlers

## Data Flow

### Component Creation Flow

```
User Request (UI or AI)
    ↓
Manifest Manager.addComponent()
    ↓
Validate against schema
    ↓
Update manifest.json
    ↓
Trigger Code Generator
    ↓
Generate React file
    ↓
Save to src/components/
    ↓
File Watcher detects (but ignores - tool-generated)
    ↓
Update UI tree view
```

### Manual Code Edit Flow

```
Developer edits in VSCode
    ↓
File Watcher detects change
    ↓
Check if tool-generated comment marker
    ↓
If user edit:
    ↓
Reverse Engineer.parseComponent()
    ↓
AI assistance if needed
    ↓
Generate ComponentDiff
    ↓
Manifest Manager.update()
    ↓
Update manifest.json
    ↓
Refresh visual editor UI
```

### Debug Session Flow

```
User clicks "Debug Mode"
    ↓
Code Generator instruments code
    ↓
Vite rebuilds
    ↓
Preview loads instrumented app
    ↓
User clicks button in preview
    ↓
Event handler wrapped by __debugWrap()
    ↓
Debug Runtime.pause()
    ↓
Send state snapshot to Electron
    ↓
UI shows current state
    ↓
User clicks "Step"
    ↓
Resume execution until next event
```

## Inter-Process Communication

Electron uses IPC for communication between main process and renderer:

```typescript
// Main Process API
ipcMain.handle('manifest:load', async (event, path) => {...});
ipcMain.handle('manifest:save', async (event, data) => {...});
ipcMain.handle('codegen:generate', async (event, manifest) => {...});
ipcMain.handle('ai:complete', async (event, prompt) => {...});

// Renderer Process API
ipcRenderer.invoke('manifest:load', projectPath);
ipcRenderer.invoke('codegen:generate', manifest);
```

**Security**: Use `contextBridge` to expose only necessary APIs to renderer

## Plugin Architecture

### Framework Plugin Interface

```typescript
interface FrameworkPlugin {
  name: string; // 'react', 'vue', 'svelte', 'angular'
  version: string;
  
  // Code generation
  generateComponent(component: Component): string;
  generateApp(manifest: Manifest): string;
  generateImports(components: Component[]): string;
  
  // Parsing (for reverse engineering)
  parseComponent(code: string): Component;
  detectFramework(code: string): boolean;
  
  // Project setup
  getProjectTemplate(): ProjectTemplate;
  getDevDependencies(): PackageJSON;
  
  // Runtime
  getDebugRuntime(): DebugRuntimeAdapter;
}
```

**Loading**: Plugins are npm packages in `node_modules/@lowcode-plugins/framework-*`

**Registration**: Auto-discover in `.lowcode/plugins/` directory

## Performance Considerations

### Manifest Loading
- **Strategy**: Lazy load component details, only load tree structure initially
- **Caching**: Keep parsed manifest in memory, save debounced (500ms)

### Code Generation
- **Strategy**: Incremental generation - only regenerate changed components
- **Optimization**: Generate in worker thread to avoid blocking UI

### File Watching
- **Strategy**: Debounce file events (200ms) to batch rapid changes
- **Filtering**: Ignore node_modules, build outputs, .git

### Preview Rendering
- **Strategy**: Vite's HMR for fast updates without full reload
- **Isolation**: Each component preview in separate iframe

## Security Considerations

1. **Sandbox Preview**: Preview webview runs with `nodeIntegration: false`
2. **Code Execution**: User scripts run in isolated context
3. **File Access**: Limit file operations to project directory
4. **API Keys**: Store AI API keys in encrypted system keychain
5. **Updates**: Auto-update Electron with signature verification

## Extensibility Points

Future plugin types beyond framework adapters:

- **Component Libraries**: shadcn, MUI, Ant Design adapters
- **Backends**: Supabase, Firebase, REST API connectors
- **Deployment**: Vercel, Netlify, AWS deployment plugins
- **AI Providers**: Custom AI provider plugins
- **Importers**: Figma, Sketch, Bubble import plugins

## Technical Debt & Future Work

1. **Performance**: Large projects (100+ components) need virtual scrolling
2. **Collaboration**: Multi-user editing via CRDT (like Figma)
3. **Version Control**: Visual git integration for manifest changes
4. **Testing**: Visual test recorder and component testing integration
5. **Accessibility**: Ensure generated code meets WCAG standards

---

**Next Steps**: See [MVP Roadmap](./MVP_ROADMAP.md) for implementation phases