# Documentation Index

Welcome to the Visual Low-Code Builder documentation! This guide will help you navigate the comprehensive documentation suite.

## 📚 Quick Navigation

### Start Here
1. **[README.md](./README.md)** - Project overview and introduction
2. **[GETTING_STARTED.md](./docs/GETTING_STARTED.md)** - Setup instructions and first steps

### Core Architecture
3. **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - Complete system design and technology stack
4. **[FILE_STRUCTURE_SPEC.md](./docs/FILE_STRUCTURE_SPEC.md)** - Project file organization
5. **[COMPONENT_SCHEMA.md](./docs/COMPONENT_SCHEMA.md)** - ⚠️ **WIP** - Manifest format (studying existing platforms)

### Key Features
6. **[DATA_FLOW.md](./docs/DATA_FLOW.md)** - Props, state, and reactive variables
7. **[EXPRESSION_SYSTEM.md](./docs/EXPRESSION_SYSTEM.md)** - Dynamic properties and scripting
8. **[DEBUGGER_DESIGN.md](./docs/DEBUGGER_DESIGN.md)** - Step-through debugging system

### Extensibility
9. **[PLUGIN_SYSTEM.md](./docs/PLUGIN_SYSTEM.md)** - Framework adapter interface
10. **[BIDIRECTIONAL_SYNC.md](./docs/BIDIRECTIONAL_SYNC.md)** - Code-to-manifest reverse engineering (stretch goal)

### Planning
11. **[MVP_ROADMAP.md](./docs/MVP_ROADMAP.md)** - Development phases, timeline, and resource allocation

---

## 📖 Reading Guide

### For Project Managers
**Recommended order**:
1. README.md (overview)
2. MVP_ROADMAP.md (timeline and resources)
3. ARCHITECTURE.md (technical approach)

**Focus on**: Phases, estimates, success criteria, risks

---

### For Developers
**Recommended order**:
1. GETTING_STARTED.md (setup)
2. ARCHITECTURE.md (system design)
3. FILE_STRUCTURE_SPEC.md (project layout)
4. DATA_FLOW.md (how data works)
5. EXPRESSION_SYSTEM.md (dynamic properties)

**Focus on**: Technical implementation, code examples, best practices

---

### For Designers/UX
**Recommended order**:
1. README.md (product vision)
2. GETTING_STARTED.md (user workflows)
3. DEBUGGER_DESIGN.md (UI examples)
4. EXPRESSION_SYSTEM.md (property editors)

**Focus on**: User interfaces, workflows, visual examples

---

### For Community Contributors
**Recommended order**:
1. README.md (project overview)
2. GETTING_STARTED.md (setup)
3. PLUGIN_SYSTEM.md (extensibility)
4. COMPONENT_SCHEMA.md (data structures)

**Focus on**: Plugin development, contribution guidelines, standards

---

## 🎯 Document Status

| Document | Status | Completeness |
|----------|--------|--------------|
| README.md | ✅ Complete | 100% |
| GETTING_STARTED.md | ✅ Complete | 100% |
| ARCHITECTURE.md | ✅ Complete | 100% |
| FILE_STRUCTURE_SPEC.md | ✅ Complete | 100% |
| DATA_FLOW.md | ✅ Complete | 100% |
| EXPRESSION_SYSTEM.md | ✅ Complete | 100% |
| DEBUGGER_DESIGN.md | ✅ Complete | 100% |
| PLUGIN_SYSTEM.md | ✅ Complete | 100% |
| BIDIRECTIONAL_SYNC.md | ✅ Complete | 100% |
| MVP_ROADMAP.md | ✅ Complete | 100% |
| **COMPONENT_SCHEMA.md** | ⚠️ **WIP** | 20% |

---

## 🔍 Finding Specific Information

### "How do I...?"

**...set up the development environment?**
→ [GETTING_STARTED.md](./docs/GETTING_STARTED.md) - Installation section

**...understand the file structure?**
→ [FILE_STRUCTURE_SPEC.md](./docs/FILE_STRUCTURE_SPEC.md)

**...create a plugin for Vue/Svelte?**
→ [PLUGIN_SYSTEM.md](./docs/PLUGIN_SYSTEM.md) - Plugin Development section

**...understand how components communicate?**
→ [DATA_FLOW.md](./docs/DATA_FLOW.md)

**...add expressions to properties?**
→ [EXPRESSION_SYSTEM.md](./docs/EXPRESSION_SYSTEM.md)

**...implement the debugger?**
→ [DEBUGGER_DESIGN.md](./docs/DEBUGGER_DESIGN.md) - Implementation Strategy

**...know what to build first?**
→ [MVP_ROADMAP.md](./docs/MVP_ROADMAP.md) - Phase breakdown

---

## 📝 Key Decisions Documented

### Architecture Decisions

| Decision | Document | Section |
|----------|----------|---------|
| Electron desktop app | ARCHITECTURE.md | Technology Stack |
| React first, plugins later | PLUGIN_SYSTEM.md | Design Principles |
| Standard Vite project structure | FILE_STRUCTURE_SPEC.md | Overview |
| Hybrid data flow (props + reactive) | DATA_FLOW.md | The Three Patterns |
| No {{ }} template syntax | EXPRESSION_SYSTEM.md | Philosophy |
| Event-level debugging | DEBUGGER_DESIGN.md | Core Concept |
| AI as copilot approach | MVP_ROADMAP.md | AI vs Human Split |

---

## 🚧 Work In Progress

### Component Schema (Priority)

**Status**: Researching existing platforms
**Need**: Analysis of Bubble, Noodl, n8n schemas
**Blockers**: None - can proceed with research
**Next Steps**: 
1. Export sample apps from existing platforms
2. Analyze JSON structures
3. Draft unified schema proposal
4. Get feedback and iterate

See [COMPONENT_SCHEMA.md](./docs/COMPONENT_SCHEMA.md) for current status

---

## 📊 Documentation Statistics

- **Total Documents**: 11
- **Total Words**: ~45,000
- **Code Examples**: 150+
- **Diagrams**: 30+
- **Tables**: 25+

---

## 🔄 Documentation Updates

This documentation is a living resource. As the project evolves:

1. **Weekly Reviews**: Check accuracy against implementation
2. **Version Tags**: Match docs to software versions
3. **Community Input**: Accept PRs for improvements
4. **Examples**: Add real-world examples as users build

---

## 💡 Contributing to Documentation

Found an error? Have a suggestion?

1. **Small fixes**: Open a PR directly
2. **Big changes**: Open an issue first to discuss
3. **New sections**: Propose in Discussions

**Style Guide**:
- Clear, concise language
- Code examples for concepts
- Diagrams for complex flows
- Cross-reference related docs

---

## 📧 Documentation Feedback

Questions about the docs? 

- **Missing info**: Open an issue tagged `documentation`
- **Unclear section**: Comment with specific questions
- **Request examples**: Tell us what you're trying to do

---

## 🎓 Learning Path

**Beginner** (Never used low-code tools):
1. README.md
2. GETTING_STARTED.md → Tutorial section
3. DATA_FLOW.md → Examples
4. Build example projects

**Intermediate** (Used Bubble/Webflow):
1. README.md → Key Differentiators
2. EXPRESSION_SYSTEM.md
3. DATA_FLOW.md → Hybrid model
4. Start building

**Advanced** (React developer):
1. ARCHITECTURE.md
2. FILE_STRUCTURE_SPEC.md
3. PLUGIN_SYSTEM.md
4. Consider contributing

---

## 🚀 Ready to Start?

1. Read [README.md](./README.md) for project vision
2. Follow [GETTING_STARTED.md](./docs/GETTING_STARTED.md) to set up
3. Reference other docs as needed
4. Join the community and build!

---

**Last Updated**: October 25, 2025  
**Documentation Version**: 0.1.0  
**Project Status**: Planning Phase