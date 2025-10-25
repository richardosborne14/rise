# Visual Low-Code Builder

> An AI-powered visual low-code development tool that generates clean, maintainable React code while providing an intuitive visual interface for component architecture and debugging.

## Vision

This project bridges the gap between AI-assisted coding (like Replit/v0) and visual low-code builders (like Noodl/Bubble). It combines:

- **AI as Architect**: Plans component hierarchy and generates initial structure
- **Visual Workshop**: Navigate, tweak, and debug using low-code paradigms
- **Clean Code Output**: Generates standard React/Vite projects that developers can extend
- **Step-Through Debugging**: Pause execution and inspect state at each interaction point

## Key Differentiators

🎯 **For Low-Code Developers**: Build faster with AI help while maintaining full control and understanding of architecture

🎯 **For Developers**: Get AI scaffolding without black-box magic - all generated code is clean, readable React

🎯 **For Teams**: Start prototypes in low-code, graduate to production-ready code without rewrites

## Architecture Highlights

- **Electron Desktop App**: Full-featured development environment
- **Standard Vite Projects**: Generated apps are normal React projects (no lock-in)
- **Metadata Layer**: `.lowcode/` folder stores visual editor state alongside standard code
- **Plugin System**: Framework-agnostic design allows Vue, Svelte, Angular adapters
- **Bidirectional Sync**: Edit code directly, AI updates visual representation

## Documentation

### Core Architecture
- [**Architecture Overview**](./docs/ARCHITECTURE.md) - System design and technology stack
- [**File Structure Specification**](./docs/FILE_STRUCTURE_SPEC.md) - Project layout and organization
- [**Component Schema**](./docs/COMPONENT_SCHEMA.md) - Manifest format (WIP - studying existing schemas)

### Features & Systems
- [**Data Flow Model**](./docs/DATA_FLOW.md) - Props, state, and reactive variables
- [**Expression System**](./docs/EXPRESSION_SYSTEM.md) - Dynamic properties and scripting
- [**Debugger Design**](./docs/DEBUGGER_DESIGN.md) - Step-through debugging implementation
- [**Plugin System**](./docs/PLUGIN_SYSTEM.md) - Framework adapter interface
- [**Bidirectional Sync**](./docs/BIDIRECTIONAL_SYNC.md) - Code-to-manifest reverse engineering

### Development
- [**MVP Roadmap**](./docs/MVP_ROADMAP.md) - Phased features and development timeline
- [**Getting Started**](./docs/GETTING_STARTED.md) - Setup and first run

## Current Status

🚧 **Planning Phase** - Architecture documentation in progress

We're currently:
1. Defining core architecture and technical decisions
2. Studying existing low-code JSON schemas (Bubble, Noodl, n8n)
3. Planning MVP feature set and implementation approach

## Target Users

**Primary**: Low-code developers who can code but want speed and AI assistance

**Secondary**: Developers looking for rapid prototyping with production-ready output

**Stretch**: No-code builders graduating to real code

## Technology Stack (Planned)

- **Desktop**: Electron
- **Frontend**: React + Vite
- **Editor**: Monaco Editor (VSCode engine)
- **Visualization**: React Flow (component connections)
- **State Management**: Zustand
- **Code Generation**: Babel/ESLint for parsing and generation

## Contributing

This project is in early planning stages. We're currently focusing on:
- Researching existing low-code schema formats
- Finalizing architecture decisions
- Building MVP feature specifications

## License

TBD

---

**Status**: 📋 Planning | **Version**: 0.0.1-alpha | **Last Updated**: October 2025