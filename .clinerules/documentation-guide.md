# Documentation Navigation Guide

## Purpose
This guide helps you efficiently find and read ONLY the documentation needed for each task, minimizing token usage while maximizing context.

## Core Principle
**READ SECTIONS, NOT FULL DOCUMENTS.** Most docs are 3,000-8,000 words. Read only the sections listed below.

---

## Task-Based Lookup

### Understanding the Manifest Format
**When:** Working with .lowcode/manifest.json or component data structures

**READ:**
1. `COMPONENT_SCHEMA.md` → Sections 1-3 (Component Structure, Properties, Children)
2. `COMPONENT_SCHEMA.md` → Section 5 (State Objects) if dealing with state

**SKIP:**
- Examples (unless creating similar component)
- Philosophy sections
- AI integration details (unless specifically working on AI features)

---

### Implementing State Management
**When:** Adding reactive state, props, or data binding

**READ:**
1. `DATA_FLOW.md` → "The Three Patterns" section
2. `DATA_FLOW.md` → Specific pattern section (Props/State/Reactive)
3. `COMPONENT_SCHEMA.md` → "State Objects" section

**SKIP:**
- Implementation examples (read only if stuck)
- Performance considerations (unless optimizing)

---

### Expression System / Dynamic Properties
**When:** Implementing user expressions, property bindings, or AI-generated code

**READ:**
1. `EXPRESSION_SYSTEM.md` → "Two-Tier System" section
2. `EXPRESSION_SYSTEM.md` → "Tier 1" OR "Tier 2" (read only what you need)
3. `SECURITY.md` → "Expression Sandboxing" section (MANDATORY)

**CRITICAL:**
- Expression sandboxing is non-negotiable
- Never bypass security for convenience
- Tier 1 expressions must be sandboxed

**SKIP:**
- Philosophy sections
- Examples (unless implementing similar feature)

---

### Code Generation
**When:** Generating React/Vue/Svelte code from manifest

**READ:**
1. `ARCHITECTURE.md` → "Code Generation" section only
2. `PLUGIN_SYSTEM.md` → "Framework Adapters" section
3. `COMPONENT_SCHEMA.md` → "Component Structure" (for reference)

**SKIP:**
- Full plugin documentation (unless creating new plugin)
- Bidirectional sync details (future feature)

---

### Plugin Development
**When:** Creating framework adapters (Vue, Svelte, etc.)

**READ:**
1. `PLUGIN_SYSTEM.md` → "Plugin Interface" section
2. `PLUGIN_SYSTEM.md` → "Design Principles" section
3. `ARCHITECTURE.md` → "Plugin Architecture" section only

**EXAMPLE:**
- Check ReactPlugin implementation as reference

**SKIP:**
- Generic architecture details
- Unrelated framework examples

---

### Security Implementation
**When:** Implementing expression execution, user code, or external integrations

**READ (MANDATORY):**
1. `SECURITY.md` → "Two-Tier Security Model" section
2. `SECURITY.md` → "Expression Sandboxing" section
3. `EXPRESSION_SYSTEM.md` → "Security" subsections

**CRITICAL RULES:**
- All user expressions run in sandboxed context
- No direct Node.js API access from user code
- Validate all input
- Use proper IPC in Electron

**SKIP:**
- Nothing. Read all security docs when implementing security features.

---

### File Structure / Project Setup
**When:** Setting up project structure or organizing code

**READ:**
1. `FILE_STRUCTURE_SPEC.md` → "Project Structure" section
2. `ARCHITECTURE.md` → "Technology Stack" section only

**SKIP:**
- Detailed implementation guides
- Framework-specific details (unless relevant)

---

### Performance Optimization
**When:** Optimizing render performance, file operations, or user interactions

**READ:**
1. `PERFORMANCE.md` → Specific optimization section needed
2. `DATA_FLOW.md` → "Performance" subsection if state-related

**KEY RULES:**
- Debounce file saves: 500ms
- Virtual scrolling: >50 items
- React.memo: expensive components only
- Profile before optimizing

**SKIP:**
- Benchmarks (unless setting targets)
- Examples (unless implementing similar optimization)

---

### Error Handling
**When:** Implementing error boundaries, validation, or user-facing errors

**READ:**
1. `ERROR_HANDLING.md` → Relevant error type section
2. `ARCHITECTURE.md` → "Error Handling" section

**PATTERN:**
- Use Result<T, Error> types
- User-friendly messages
- Include debugging context

**SKIP:**
- Examples (unless similar error scenario)

---

### Testing
**When:** Writing tests or setting up test infrastructure

**READ:**
1. `TESTING_STRATEGY.md` → Relevant test type section (Unit/Integration/Manual)
2. `TESTING_STRATEGY.md` → "Testing Philosophy" (first time only)

**SKIP:**
- Full test examples (reference as needed)
- Tool documentation (check official docs instead)

---

### API / External Integration
**When:** Connecting to external services or APIs

**READ:**
1. `API_INTEGRATION.md` → Relevant integration section
2. `SECURITY.md` → "External Services" section

**SKIP:**
- Unrelated integration examples

---

### Debugging / Debugger Implementation
**When:** Implementing step-through debugger or debugging features

**READ:**
1. `DEBUGGER_DESIGN.md` → Relevant section (Architecture/UI/Implementation)

**SKIP:**
- Full document (read incrementally as needed)

---

### AI Integration
**When:** Implementing AI-powered features, code suggestions, or analysis

**READ:**
1. `COMPONENT_SCHEMA.md` → "AI Integration" section
2. `EXPRESSION_SYSTEM.md` → "AI as Copilot" section

**PHILOSOPHY:**
- AI is copilot, not autopilot
- Always provide options, never force decisions
- Track authorship (user vs AI)

**SKIP:**
- Generic AI documentation
- Examples (unless implementing similar feature)

---

## Reading Priority

### Tier 1: Always Read (Core Concepts)
These provide foundation understanding. Read once at project start:
- `README.md`
- `ARCHITECTURE.md` → "System Overview" and "Technology Stack" sections
- `COMPONENT_SCHEMA.md` → Sections 1-3

### Tier 2: Context-Dependent (Feature Work)
Read only when working on specific features:
- `DATA_FLOW.md` (state management)
- `EXPRESSION_SYSTEM.md` (expressions)
- `PLUGIN_SYSTEM.md` (plugins)
- `SECURITY.md` (security features)

### Tier 3: Reference Only (As Needed)
Read only when questions arise or implementing specific features:
- `PERFORMANCE.md`
- `TESTING_STRATEGY.md`
- `ERROR_HANDLING.md`
- `DEBUGGER_DESIGN.md`
- `BIDIRECTIONAL_SYNC.md`
- `EXAMPLES.md`

---

## Anti-Patterns (What NOT to Do)

### ❌ Don't Read Full Documents
- Most docs are 3,000-8,000 words
- Read only relevant sections listed above

### ❌ Don't Read Examples Unless Needed
- Examples are for reference, not required reading
- Read only when implementing similar features

### ❌ Don't Re-Read Philosophy Sections
- Read once for context
- Skip on subsequent reads

### ❌ Don't Read Duplicate Information
- If you've read about state in DATA_FLOW.md, you don't need to read about it again in COMPONENT_SCHEMA.md unless you need schema-specific details

### ❌ Don't Skip Security Documentation
- Security docs are mandatory when implementing:
  - Expression execution
  - User code evaluation
  - External integrations
  - File system operations

---

## Quick Reference Table

| Task | Primary Doc | Section | Secondary Doc |
|------|-------------|---------|---------------|
| Component structure | COMPONENT_SCHEMA.md | 1-3 | - |
| State management | DATA_FLOW.md | Three Patterns | COMPONENT_SCHEMA.md §5 |
| Expressions | EXPRESSION_SYSTEM.md | Two-Tier System | SECURITY.md |
| Code generation | ARCHITECTURE.md | Code Generation | PLUGIN_SYSTEM.md |
| Plugin dev | PLUGIN_SYSTEM.md | Plugin Interface | ARCHITECTURE.md |
| Security | SECURITY.md | All sections | EXPRESSION_SYSTEM.md |
| File structure | FILE_STRUCTURE_SPEC.md | Project Structure | - |
| Performance | PERFORMANCE.md | Specific section | - |
| Testing | TESTING_STRATEGY.md | Test type section | - |
| AI features | COMPONENT_SCHEMA.md | AI Integration | EXPRESSION_SYSTEM.md |

---

## Workflow Example

**Task:** "Add state management to UserCard component"

**Efficient approach:**
1. Read `DATA_FLOW.md` → "State Pattern" section (~500 words)
2. Read `COMPONENT_SCHEMA.md` → "State Objects" section (~400 words)
3. Implement
4. Reference `EXAMPLES.md` only if stuck

**Token saved:** ~6,000 words (vs reading full docs)

---

## When to Read DOCUMENTATION_INDEX.md

**Only read when:**
- Starting the project (first time orientation)
- Need to understand overall documentation structure
- Looking for a document not listed in this guide

**Don't read when:**
- Implementing a specific feature (use this guide instead)
- You already know what document you need

---

## Updates

This guide should be updated when:
- New documentation is added
- Document structure changes significantly
- Common lookup patterns emerge

**Last Updated:** October 25, 2025
