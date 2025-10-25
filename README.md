# Rise: Visual Low-Code Builder

> An AI-powered visual low-code development tool that generates clean, maintainable code while providing an intuitive visual interface for component architecture and debugging.

## Vision

Rise bridges the gap between AI-assisted coding (like Replit/v0) and visual low-code builders (like Noodl/Bubble). It combines:

- **🎯 User Empowerment**: Custom expressions and global functions give users complete control
- **🤖 AI as Copilot**: Intelligent assistance without taking over - review, suggest, generate
- **🔓 Zero Lock-in**: Clean code output that developers can take anywhere
- **🔮 Future-Proof**: Plugin system supports any framework or library

## Key Differentiators

**🎯 For Low-Code Developers**: Build faster with AI help while maintaining full control and understanding of architecture

**🎯 For Developers**: Get AI scaffolding without black-box magic - all generated code is clean, readable, and documented

**🎯 For Teams**: Start prototypes in low-code, graduate to production-ready code without rewrites

## Architecture Highlights

- **Electron Desktop App**: Full-featured development environment
- **Standard Projects**: Generated apps are normal React/Vue/Svelte projects (no lock-in)
- **Metadata Layer**: `.lowcode/` folder stores visual editor state alongside standard code
- **Plugin System**: Framework-agnostic design allows Vue, Svelte, Angular adapters
- **Bidirectional Sync**: Edit code directly, AI updates visual representation

## The Rise Philosophy

### 🎯 User Empowerment First
- **Custom JavaScript Expressions**: Click any property and write your own code
- **Global Functions**: Define reusable logic once, use everywhere
- **Expression Editor**: Direct code input with autocomplete and validation
- **Full Control**: Never locked into AI-generated solutions

### 🤖 AI as Your Copilot
- **Code Review**: AI analyzes your code and suggests improvements
- **Smart Generation**: AI creates boilerplate, you control the details
- **User Override**: You can always override any AI suggestion
- **Learning Partner**: AI explains complex patterns and helps you grow

### 🔓 Zero Vendor Lock-in
- **Clean Code Output**: Standard React/Vue/Svelte with comments and documentation
- **Framework Freedom**: Plugin system supports any frontend framework
- **Standard Tooling**: Works with ESLint, Prettier, TypeScript, Vite, webpack
- **Deploy Anywhere**: Vercel, Netlify, AWS, or your own infrastructure

### 🔮 Future-Proof Architecture
- **Plugin Ecosystem**: Community can extend to any framework or library
- **Schema Evolution**: Built-in migration system for schema updates
- **Backend Agnostic**: Works with Supabase, Firebase, or custom APIs
- **Extensible Everything**: Components, styling, deployment, authentication

---

## Documentation

### 🏗️ Core Architecture
- [**Architecture Overview**](./docs/ARCHITECTURE.md) - System design and technology stack
- [**File Structure Specification**](./docs/FILE_STRUCTURE_SPEC.md) - Project layout and organization
- [**Component Schema**](./docs/COMPONENT_SCHEMA.md) - Complete JSON manifest specification

### ⚡ Key Features
- [**Data Flow Model**](./docs/DATA_FLOW.md) - Props, state, and reactive variables
- [**Expression System**](./docs/EXPRESSION_SYSTEM.md) - Dynamic properties and scripting
- [**Debugger Design**](./docs/DEBUGGER_DESIGN.md) - Step-through debugging implementation

### 🔧 Extensibility
- [**Plugin System**](./docs/PLUGIN_SYSTEM.md) - Framework adapter interface
- [**Bidirectional Sync**](./docs/BIDIRECTIONAL_SYNC.md) - Code-to-manifest reverse engineering

### 🚀 Development
- [**MVP Roadmap**](./docs/MVP_ROADMAP.md) - Phased features and development timeline
- [**Getting Started**](./docs/GETTING_STARTED.md) - Setup and first run

**📚 [Complete Documentation Index](./DOCUMENTATION_INDEX.md)** - Navigate all docs efficiently

---

## Example: Real-World Chat Component

Here's how Rise handles complex components with our hybrid schema approach:

### Visual Editor
```
┌─────────────────────────────────────────┐
│ ChatMessage Component                   │
├─────────────────────────────────────────┤
│ Properties:                             │
│ ┌─ timeDisplay ─────────────────────────┐│
│ │ formatTimeAgo(props.message.createdAt)││
│ │ [Edit Expression] [AI Review]         ││
│ └───────────────────────────────────────┘│
│                                         │
│ Event Handlers:                         │
│ • onUserClick → Navigate to profile     │
│ • onBookmark → Save to database         │
│ • onReply → Show thread input           │
│                                         │
│ Data Connections:                       │
│ • threadComments (Live WebSocket)       │
│ • reactionCounts (Real-time aggregate)  │
└─────────────────────────────────────────┘
```

### Generated React Code
```jsx
import { formatTimeAgo } from '../utils/globalFunctions.js';

/**
 * Dynamic chat message with user context, reactions, and threading
 * Generated by Rise - Component Schema v1.0.0
 */
export function ChatMessage({ message, currentUserId }) {
  // User-defined expression with AI optimization
  const timeDisplay = useMemo(() => 
    formatTimeAgo(message.createdAt), [message.createdAt]
  );
  
  const isOwnMessage = useMemo(() => 
    message.userId === currentUserId, [message.userId, currentUserId]
  );
  
  const handleUserClick = () => {
    // Navigate to user profile on name click
    navigate(`/profile/${message.userId}`);
  };
  
  return (
    <article 
      className={`message ${isOwnMessage ? 'own' : 'other'}`}
      data-testid="chat-message"
    >
      <UserAvatar userId={message.userId} onClick={handleUserClick} />
      <span className="time">{timeDisplay}</span>
      <MessageContent text={message.text} />
      <ReactionBar messageId={message.id} />
      <ThreadAccordion messageId={message.id} />
    </article>
  );
}
```

### User Power Features
- **Custom Expression**: User wrote `formatTimeAgo(props.message.createdAt)` directly
- **Global Function**: `formatTimeAgo` is defined once, used everywhere
- **AI Review**: AI suggested memoization for performance
- **Real-time Data**: WebSocket connections auto-generated
- **Clean Output**: Standard React that any developer can extend

---

## Schema-Driven Development

Rise's component schema is designed for maximum AI understanding while preserving user control:

```json
{
  "comp_chat_message_001": {
    "displayName": "ChatMessage",
    "author": "ai-generated",
    "userModified": true,
    "aiDescription": "Dynamic chat message with threading",
    
    "properties": {
      "timeDisplay": {
        "type": "expression",
        "expression": "formatTimeAgo(props.message.createdAt)",
        "author": "user",
        "userEditable": true,
        "aiHint": "Shows human-readable time since creation"
      }
    },
    
    "codeReview": {
      "aiFindings": ["Performance: Good memoization strategy"],
      "userAcknowledged": true
    }
  }
}
```

**Key Features:**
- 🎯 **Semantic Structure**: AI understands component intent and relationships
- 👤 **Authorship Tracking**: See what you built vs what AI helped with
- 🔧 **Expression Freedom**: Write any JavaScript code in properties
- 🤖 **AI Integration**: Code review, suggestions, and optimization hints
- 🔌 **Plugin Ready**: Framework plugins interpret schema for any target

---

## Current Status

✅ **Architecture Complete** - All core technical decisions finalized and documented

**📋 Recent Milestones:**
1. ✅ Comprehensive architecture design
2. ✅ Component schema specification complete
3. ✅ Plugin system architecture defined
4. ✅ Expression system with user empowerment
5. ✅ AI integration strategy finalized

**🚀 Next Phase: MVP Implementation**
- Begin core Manifest Manager development
- Implement React plugin as reference
- Build expression editor with JavaScript support
- Create AI copilot integration
- Develop visual component tree editor

---

## Technology Stack

### Desktop Application
- **Framework**: Electron 28+
- **UI**: React 18+ with TypeScript
- **State Management**: Zustand (lightweight, reactive)
- **Editor**: Monaco Editor (VSCode engine)
- **Styling**: Tailwind CSS

### Code Generation
- **Target**: Standard Vite + React projects (extensible to Vue/Svelte)
- **Parser**: Babel (AST manipulation)
- **Generator**: Framework plugins with semantic interpretation
- **Quality**: ESLint + Prettier integration

### AI Integration
- **Primary**: Anthropic Claude API
- **Features**: Code review, generation, optimization suggestions
- **Philosophy**: Copilot, not replacement - user always in control

---

## Target Users

### Primary: **Empowered Low-Code Developers**
- Want speed of visual development with power of code
- Comfortable with JavaScript but want AI assistance
- Need clean, maintainable output for long-term projects
- Value understanding over black-box solutions

### Secondary: **Rapid Prototyping Developers**
- Need quick scaffolding for complex applications  
- Want AI help with boilerplate but control over logic
- Require production-ready output that scales
- Looking for modern alternative to traditional low-code

### Stretch: **No-Code Graduates**
- Outgrowing traditional no-code platforms
- Ready to learn real development concepts
- Want to transition to code without starting from scratch
- Need gradual learning curve with AI mentorship

---

## Community & Contributing

### 🔌 Plugin Development
Build support for your favorite framework or library:
- **Vue Plugin**: Generate Vue 3 composition API components
- **Svelte Plugin**: Create reactive Svelte components  
- **Angular Plugin**: Generate standalone Angular components
- **UI Library Plugins**: shadcn, MUI, Ant Design, Chakra UI

### 📖 Documentation
Help improve the comprehensive documentation suite:
- Technical examples and tutorials
- Real-world use case studies  
- Plugin development guides
- Best practices and patterns

### 🐛 Issues & Features
We welcome bug reports, feature requests, and architecture discussions:
- **GitHub Issues**: Technical bugs and feature requests
- **Discussions**: Architecture ideas and community feedback
- **Discord**: Real-time development chat (coming soon)

---

## License

MIT License - see [LICENSE](./LICENSE) for details

---

## Getting Started

Ready to explore Rise? Start with our comprehensive guides:

1. **[📖 Documentation Index](./DOCUMENTATION_INDEX.md)** - Navigate all documentation
2. **[🏗️ Architecture Overview](./docs/ARCHITECTURE.md)** - Understand the system design  
3. **[📋 Component Schema](./docs/COMPONENT_SCHEMA.md)** - Learn the JSON manifest format
4. **[🚀 Getting Started](./docs/GETTING_STARTED.md)** - Set up your development environment

---

**Rise: Where AI meets empowerment. Where visual meets code. Where lock-in meets freedom.**

*Building the Tesla of low-code platforms - no compromises, maximum empowerment, unlimited extensibility.*

---

**Status**: 🏗️ Architecture Complete | **Version**: 0.1.0-alpha | **Last Updated**: October 2025