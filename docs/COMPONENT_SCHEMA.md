# Component Schema Specification

> ⚠️ **WORK IN PROGRESS** - This document is incomplete and subject to change

## Status

We are currently researching existing low-code platform schemas to inform our design:

### Platforms to Study
- ✅ **Bubble.io** - Workflow and data structure approach
- ✅ **Noodl** - Node-based component system with inputs/outputs
- ⏳ **n8n** - Workflow nodes and connections model
- ⏳ **Webflow** - Visual CSS and component architecture
- ⏳ **Retool** - Component properties and data binding
- ⏳ **Appsmith** - Widget configuration format

## Goals for Our Schema

Our component manifest format should:

1. **Be Human-Readable**: JSON format that developers can understand and edit manually if needed
2. **Support Framework Agnostic**: Work for React, Vue, Svelte, Angular through plugins
3. **Enable Visual Editing**: All properties must be representable in visual UI
4. **Allow Versioning**: Schema can evolve while maintaining backward compatibility
5. **Facilitate AI Understanding**: Clear structure for AI to parse and generate

## Initial Structure (Draft)

This is a **very rough draft** and will evolve significantly:

```json
{
  "version": "0.1.0",
  "metadata": {
    "name": "UserDashboard",
    "framework": "react",
    "createdAt": "2025-10-25T10:00:00Z",
    "updatedAt": "2025-10-25T15:30:00Z"
  },
  "components": {
    "root": {
      "id": "root",
      "type": "App",
      "children": ["header", "main", "footer"]
    },
    "header": {
      "id": "header",
      "type": "Header",
      "props": {
        "title": {
          "type": "static",
          "value": "Dashboard"
        }
      },
      "children": []
    }
  },
  "connections": [],
  "variables": {},
  "scripts": {}
}
```

## Key Decisions to Make

### 1. Component Identification
- **UUID vs Human-Readable IDs**: Which is better for tracking?
- **Path-based IDs**: Should IDs encode hierarchy (e.g., `root.header.logo`)?

### 2. Property Types
How do we represent:
- Static values
- Expressions (JavaScript code)
- Bindings to other components
- Reactive variables
- Function references

### 3. Component Types
- **Primitives**: div, button, input, text
- **Composites**: Custom components built from primitives
- **Imported**: Third-party library components
- **Scripts**: Non-visual logic components

### 4. Connection Representation
How to model data flow between components:
- Event → Handler connections
- Data binding connections
- State update chains

### 5. State Management
- Component-local state
- Parent-child prop passing
- Global reactive variables
- Computed values

## Questions to Answer

1. **Flat vs Nested Structure**: Should components be in flat object or nested tree?
2. **Reference vs Inline**: Should child components be referenced by ID or inlined?
3. **Styling Representation**: How to store Tailwind classes, CSS modules, inline styles?
4. **Validation Rules**: What validation should happen at schema level vs runtime?
5. **Metadata Depth**: How much metadata (position, comments, etc.) to store?

## Research Tasks

- [ ] Export and analyze Bubble app structure
- [ ] Study Noodl project file format
- [ ] Review n8n workflow JSON structure
- [ ] Examine Webflow's component JSON
- [ ] Compare with React component tree representation
- [ ] Interview low-code developers about their needs

## Timeline

- **Week 1-2**: Complete platform research and analysis
- **Week 3**: Draft comprehensive schema with examples
- **Week 4**: Build validator and test with sample apps
- **Week 5**: Finalize v0.1.0 schema specification

## Contributing to This Document

If you have experience with low-code platforms or component-based architectures, please contribute:

1. Examples of existing schemas you've worked with
2. Pain points you've encountered with other formats
3. Must-have features for visual editing
4. Edge cases we should consider

---

**Last Updated**: October 25, 2025  
**Next Review**: After platform research completion  
**Owner**: Architecture Team