# Component Schema Specification

> The definitive JSON manifest format for Rise projects - designed for AI understanding, user empowerment, and framework agnostic code generation.

## Philosophy

Rise's component schema embodies four core principles:

1. **🎯 User Empowerment**: Custom expressions and global functions give users complete control
2. **🤖 AI as Copilot**: Rich metadata enables AI assistance while preserving user choice
3. **🔓 Zero Lock-in**: Clean code generation that developers can take anywhere
4. **🔮 Future-Proof**: Plugin system supports any framework or library

---

## Schema Overview

### Version 1.0.0 Structure

```json
{
  "schemaVersion": "1.0.0",
  "riseVersion": "1.0.0",
  "metadata": { /* Project info */ },
  "buildConfig": { /* Build settings */ },
  "plugins": { /* Framework and library plugins */ },
  "globalFunctions": { /* User-defined reusable functions */ },
  "globalState": { /* Reactive global variables */ },
  "assets": { /* Images, fonts, icons */ },
  "security": { /* Security policies */ },
  "components": { /* Component definitions */ },
  "connections": { /* Data flow between components */ },
  "routes": { /* Application routing */ },
  "api": { /* API configuration */ },
  "database": { /* Database setup */ },
  "deployment": { /* Deployment settings */ },
  "migrations": { /* Schema versioning */ },
  "analytics": { /* Performance metrics */ }
}
```

---

## Core Design Decisions

### ✅ Decision 1: Component Identity
**UUID + Semantic Names** for AI understanding and conflict prevention

```json
{
  "id": "comp_chat_message_001",
  "displayName": "ChatMessage",
  "aiDescription": "Dynamic chat message with user context and reactions"
}
```

### ✅ Decision 2: Property System  
**Hybrid Semantic System** with full JavaScript expression support

```json
{
  "properties": {
    "timeDisplay": {
      "type": "expression",
      "expression": "formatTimeAgo(props.message.createdAt)",
      "author": "user",
      "userEditable": true,
      "aiHint": "Shows human-readable time since message creation"
    }
  }
}
```

### ✅ Decision 3: Component Hierarchy
**Flat Structure with References** for easier AI manipulation and component reuse

```json
{
  "components": {
    "comp_app_001": {
      "children": ["comp_header_001", "comp_main_001"]
    },
    "comp_header_001": {
      "children": ["comp_logo_001", "comp_nav_001"]  
    }
  }
}
```

### ✅ Decision 4: State Management
**Multi-Layer State System** supporting all state patterns

```json
{
  "globalState": { /* Reactive global variables */ },
  "localState": { /* Component-local state */ },
  "connections": [ /* Data flow connections */ ]
}
```

### ✅ Decision 5: Framework Abstraction
**Semantic Abstractions** that plugins can interpret for any framework

```json
{
  "type": "DataList",
  "semantics": {
    "concept": "Displays a collection of items with filtering",
    "patterns": ["list", "filter", "pagination"]
  }
}
```

---

## Complete Schema Reference

### Project Metadata

```json
{
  "metadata": {
    "projectName": "ChatApp",
    "description": "Real-time chat application with threading",
    "framework": "react",
    "typescript": true,
    "createdAt": "2025-10-25T10:00:00Z",
    "updatedAt": "2025-10-25T15:30:00Z",
    "authors": ["user@example.com"],
    
    "aiAssistant": {
      "role": "copilot",
      "permissions": ["review", "suggest", "generate", "optimize"],
      "userOverride": true,
      "lastInteraction": "2025-10-25T15:30:00Z"
    }
  }
}
```

**Key Features:**
- **AI Role Definition**: Establishes AI as helper, not replacement
- **User Override**: Users can always override AI suggestions
- **Authorship Tracking**: Know who created what

### Build Configuration

```json
{
  "buildConfig": {
    "target": "web",
    "bundler": "vite", 
    "outputDir": "dist",
    "sourceMaps": true,
    "minify": true,
    "treeshaking": true,
    "cssFramework": "tailwind",
    "deploymentTargets": ["vercel", "netlify", "aws"]
  }
}
```

### Plugin System

```json
{
  "plugins": {
    "framework": {
      "name": "@rise/plugin-react",
      "version": "1.0.0",
      "config": {
        "jsx": "react-jsx",
        "strictMode": true
      }
    },
    "styling": {
      "name": "@rise/plugin-tailwind",
      "userCustomizations": ["custom-colors", "spacing-scale"]
    },
    "ui": {
      "name": "@rise/plugin-shadcn",
      "components": ["Button", "Dialog", "Table"],
      "userOverrides": {
        "Button": "custom-button-variant"
      }
    }
  }
}
```

**Plugin Types:**
- **Framework**: React, Vue, Svelte, Angular
- **Styling**: Tailwind, CSS Modules, Styled Components
- **UI Libraries**: shadcn, MUI, Ant Design
- **Backend**: Supabase, Firebase, custom APIs
- **Deployment**: Vercel, Netlify, AWS

### Global Functions (User Empowerment)

```json
{
  "globalFunctions": {
    "formatTimeAgo": {
      "code": "function formatTimeAgo(date) {\n  const now = new Date();\n  const diff = now - new Date(date);\n  const minutes = Math.floor(diff / 60000);\n  if (minutes < 60) return `${minutes}m ago`;\n  const hours = Math.floor(minutes / 60);\n  return hours < 24 ? `${hours}h ago` : `${Math.floor(hours / 24)}d ago`;\n}",
      "description": "Converts date to human-readable time ago format",
      "parameters": [{"name": "date", "type": "Date|string"}],
      "returns": "string",
      "author": "user",
      "aiReviewStatus": "approved",
      "aiComments": ["Well-structured", "Good performance"],
      "usageCount": 47,
      "performanceMetrics": {"avgExecutionTime": "0.2ms"}
    }
  }
}
```

**Features:**
- **Full JavaScript**: Users can write any code they want
- **AI Code Review**: AI provides feedback and suggestions
- **Usage Tracking**: See how often functions are used
- **Performance Metrics**: Monitor function performance

### Global State

```json
{
  "globalState": {
    "currentUser": {
      "type": "reactive",
      "dataType": "object",
      "default": null,
      "schema": {
        "id": "string",
        "name": "string",
        "email": "string",
        "avatar": "string"
      },
      "aiComment": "Currently authenticated user data",
      "persistence": "localStorage"
    }
  }
}
```

### Component Definition

```json
{
  "components": {
    "comp_chat_message_001": {
      "id": "comp_chat_message_001",
      "displayName": "ChatMessage", 
      "type": "CompositeComponent",
      "category": "messaging",
      "author": "ai-generated",
      "userModified": true,
      "aiDescription": "Dynamic chat message with user context, reactions, and threading",
      
      "properties": {
        "message": {
          "type": "prop",
          "dataType": "object",
          "required": true,
          "schema": {
            "id": "string",
            "text": "string", 
            "userId": "string",
            "createdAt": "datetime",
            "isRead": "boolean"
          },
          "aiComment": "Message data object from database"
        },
        
        "timeDisplay": {
          "type": "expression",
          "expression": "formatTimeAgo(props.message.createdAt)",
          "dependencies": ["props.message.createdAt", "globalFunctions.formatTimeAgo"],
          "author": "user",
          "userEditable": true,
          "aiHint": "Shows human-readable time since message creation",
          "expectedReturn": "string"
        }
      },

      "computedProperties": {
        "isOwnMessage": {
          "expression": "props.message.userId === props.currentUserId",
          "aiComment": "Determines if message belongs to current user"
        }
      },

      "localState": {
        "isExpanded": {
          "type": "boolean",
          "default": false,
          "aiComment": "Whether thread accordion is expanded"
        }
      },

      "eventHandlers": {
        "onUserClick": {
          "action": "navigation",
          "target": "/profile/${props.message.userId}",
          "aiComment": "Navigate to user profile on name click"
        },
        
        "onBookmark": {
          "action": "database.create",
          "table": "bookmarks",
          "data": "{ messageId: props.message.id, userId: props.currentUserId }",
          "aiComment": "Create bookmark record in database"
        }
      },

      "dataConnections": {
        "threadComments": {
          "type": "liveQuery",
          "source": "supabase.comments",
          "filter": "parentMessageId === props.message.id",
          "realtime": true,
          "transport": "websocket",
          "aiComment": "Live-updating thread comments"
        }
      },

      "styling": {
        "baseClasses": ["message", "rounded-lg", "p-4", "mb-2"],
        "conditionalClasses": {
          "container": [
            "computed.isOwnMessage ? 'ml-auto' : 'mr-auto'",
            "props.message.isRead ? 'opacity-70' : 'opacity-100'"
          ]
        }
      },

      "children": [
        "comp_user_avatar_001",
        "comp_message_content_001",
        "comp_reaction_bar_001"
      ],

      "accessibility": {
        "role": "article",
        "ariaLabel": "Chat message from ${props.message.userName}",
        "keyboardNavigation": true
      },

      "performance": {
        "memoization": ["timeDisplay", "reactionCounts"],
        "lazyLoading": ["threadComments"]
      },

      "testing": {
        "testId": "chat-message", 
        "scenarios": [
          "renders own message",
          "renders other user message",
          "shows unread indicator"
        ]
      },

      "codeReview": {
        "lastReviewDate": "2025-10-25T15:30:00Z",
        "aiFindings": [
          "Performance: Good memoization strategy",
          "Security: Sanitized user content"
        ],
        "userAcknowledged": true
      }
    }
  }
}
```

### Data Connections

```json
{
  "connections": [
    {
      "id": "conn_001",
      "from": {
        "componentId": "comp_login_001",
        "output": "onSuccess"
      },
      "to": {
        "componentId": "comp_app_001",
        "input": "user"
      },
      "transform": "user => ({ ...user, lastLogin: new Date() })",
      "aiComment": "Pass authenticated user to app context"
    }
  ]
}
```

---

## Property Types Reference

### Static Values
```json
{
  "title": {
    "type": "static",
    "value": "Dashboard",
    "aiComment": "Static page title"
  }
}
```

### Expressions (User JavaScript)
```json
{
  "dynamicText": {
    "type": "expression", 
    "expression": "formatTimeAgo(props.createdAt)",
    "dependencies": ["props.createdAt", "globalFunctions.formatTimeAgo"],
    "author": "user",
    "userEditable": true
  }
}
```

### Props (Component Inputs)
```json
{
  "userData": {
    "type": "prop",
    "dataType": "object",
    "required": true,
    "schema": {
      "id": "string",
      "name": "string"
    }
  }
}
```

### State Variables
```json
{
  "isVisible": {
    "type": "state",
    "dataType": "boolean", 
    "default": false,
    "aiComment": "Controls modal visibility"
  }
}
```

### Event Handlers
```json
{
  "onClick": {
    "type": "eventHandler",
    "action": "navigation",
    "target": "/dashboard",
    "aiComment": "Navigate to dashboard on click"
  }
}
```

### Data Connections
```json
{
  "userList": {
    "type": "liveQuery",
    "source": "database.users", 
    "filter": "isActive === true",
    "realtime": true
  }
}
```

---

## Code Generation Examples

### React Output
```jsx
// Generated from schema
import React, { useState, useMemo } from 'react';
import { formatTimeAgo } from '../utils/globalFunctions.js';

/**
 * Dynamic chat message with user context, reactions, and threading
 * Generated by Rise - Component Schema v1.0.0
 */
export function ChatMessage({ message, currentUserId }) {
  // Local state
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Computed properties  
  const isOwnMessage = useMemo(() => 
    message.userId === currentUserId, [message.userId, currentUserId]
  );
  
  // User-defined expression
  const timeDisplay = useMemo(() => 
    formatTimeAgo(message.createdAt), [message.createdAt]
  );
  
  // Event handlers
  const handleUserClick = () => {
    // Navigate to user profile on name click
    navigate(`/profile/${message.userId}`);
  };
  
  return (
    <article 
      className={`message rounded-lg p-4 mb-2 ${isOwnMessage ? 'ml-auto' : 'mr-auto'} ${message.isRead ? 'opacity-70' : 'opacity-100'}`}
      aria-label={`Chat message from ${message.userName}`}
      data-testid="chat-message"
    >
      <UserAvatar userId={message.userId} onClick={handleUserClick} />
      <MessageContent text={message.text} />
      <span className="time-display">{timeDisplay}</span>
      <ReactionBar messageId={message.id} />
    </article>
  );
}
```

### Vue Output (Plugin Generated)
```vue
<template>
  <article 
    :class="messageClasses"
    :aria-label="`Chat message from ${message.userName}`"
    data-testid="chat-message"
  >
    <UserAvatar :userId="message.userId" @click="handleUserClick" />
    <MessageContent :text="message.text" />
    <span class="time-display">{{ timeDisplay }}</span>
    <ReactionBar :messageId="message.id" />
  </article>
</template>

<script setup>
import { computed, ref } from 'vue';
import { formatTimeAgo } from '../utils/globalFunctions.js';

// Props
const props = defineProps({
  message: { type: Object, required: true },
  currentUserId: { type: String, required: true }
});

// Local state
const isExpanded = ref(false);

// Computed properties
const isOwnMessage = computed(() => 
  props.message.userId === props.currentUserId
);

const timeDisplay = computed(() => 
  formatTimeAgo(props.message.createdAt)
);

const messageClasses = computed(() => [
  'message', 'rounded-lg', 'p-4', 'mb-2',
  isOwnMessage.value ? 'ml-auto' : 'mr-auto',
  props.message.isRead ? 'opacity-70' : 'opacity-100'
]);

// Event handlers
const handleUserClick = () => {
  // Navigate to user profile on name click
  router.push(`/profile/${props.message.userId}`);
};
</script>
```

---

## Expression System Details

### User Expression Editor
Users can click any text property and edit expressions directly:

```
┌─────────────────────────────────────────┐
│ Time Display Expression                 │
├─────────────────────────────────────────┤
│ formatTimeAgo(props.message.createdAt)  │
│                                         │
│ Available Functions:                    │
│ • formatTimeAgo(date) → string         │
│ • validateEmail(email) → boolean       │
│                                         │
│ Available Properties:                   │
│ • props.message.createdAt              │
│ • props.message.text                   │
│ • props.currentUserId                  │
│                                         │
│ [✓ Valid Expression] [Apply] [Cancel]   │
└─────────────────────────────────────────┘
```

### Expression Features
- **Real-time validation** as user types
- **Autocomplete** for functions and properties  
- **Dependency tracking** for visual editor updates
- **AI assistance** for complex expressions
- **Performance monitoring** for optimization

---

## AI Integration Features

### Code Review System
```json
{
  "codeReview": {
    "aiFindings": [
      "Performance: Consider memoizing expensive calculations",
      "Security: Input validation looks good",
      "Accessibility: Missing aria-label on interactive element"
    ],
    "aiSuggestions": [
      "Use React.memo for this component to prevent unnecessary re-renders",
      "Consider extracting the time formatting logic into a custom hook"
    ],
    "userResponse": "Applied memoization suggestion, keeping custom logic"
  }
}
```

### AI Assistance Modes
- **Generate**: AI creates component boilerplate
- **Review**: AI analyzes code for improvements  
- **Suggest**: AI proposes optimizations
- **Explain**: AI explains complex code patterns
- **Debug**: AI helps troubleshoot issues

### User Override System
```json
{
  "aiSuggestion": "props.message.text.substring(0, 100)",
  "userOverride": "props.message.text.slice(0, 100) + '...'",
  "userReason": "Prefer slice() and ellipsis for UX"
}
```

---

## Framework Plugin System

### Plugin Interface
```typescript
interface FrameworkPlugin {
  name: string;
  generateComponent(schema: ComponentSchema): string;
  parseComponent(code: string): ComponentSchema;
  translateExpression(expr: string): string;
  capabilities: {
    debugger: boolean;
    hotReload: boolean;
    typescript: boolean;
  };
}
```

### Cross-Framework Translation
```json
{
  "eventHandlers": {
    "onClick": {
      "action": "custom",
      "code": "handleClick()"
    }
  }
}
```

**Generates:**
- **React**: `onClick={handleClick}`
- **Vue**: `@click="handleClick"`  
- **Svelte**: `on:click={handleClick}`
- **Angular**: `(click)="handleClick()"`

---

## Security & Validation

### Expression Sandbox
```json
{
  "security": {
    "validation": {
      "strictMode": true,
      "typeChecking": true,
      "expressionSandbox": true,
      "disallowedFunctions": ["eval", "Function", "setTimeout"],
      "maxExecutionTime": "100ms"
    }
  }
}
```

### Content Security Policy
```json
{
  "security": {
    "csp": {
      "enabled": true,
      "directives": {
        "default-src": "'self'",
        "script-src": "'self' 'unsafe-inline'",
        "style-src": "'self' 'unsafe-inline'"
      }
    }
  }
}
```

---

## Migration & Versioning

### Schema Evolution
```json
{
  "migrations": {
    "version": "1.0.0",
    "history": [
      {
        "from": "0.9.0",
        "to": "1.0.0",
        "changes": ["Added plugin system", "Updated expression format"],
        "migrationScript": "scripts/migrate-v1.js"
      }
    ]
  }
}
```

### Backward Compatibility
- **Automatic migration** for schema updates
- **Graceful degradation** for missing features  
- **Plugin versioning** for compatibility
- **Rollback support** for failed migrations

---

## Performance Optimization

### Component-Level Optimization
```json
{
  "performance": {
    "memoization": ["timeDisplay", "userAvatar"],
    "lazyLoading": ["threadComments", "reactions"],
    "virtualScrolling": true,
    "preloading": ["userProfiles"]
  }
}
```

### Build Optimization
```json
{
  "buildConfig": {
    "treeshaking": true,
    "codeSplitting": true,
    "compression": "gzip",
    "bundleAnalysis": true
  }
}
```

---

## Testing Integration

### Component Testing
```json
{
  "testing": {
    "framework": "vitest",
    "testId": "chat-message",
    "scenarios": [
      "renders own message with correct styling",
      "renders other user message aligned left", 
      "shows unread indicator when isRead is false",
      "handles user click navigation",
      "displays formatted time correctly"
    ],
    "accessibility": ["keyboard navigation", "screen reader"],
    "performance": ["render time < 16ms", "memory usage < 1MB"]
  }
}
```

---

## Real-World Examples

### Complete Chat Application Schema
[View the complete ChatApp schema example →](./examples/chat-app-schema.json)

### E-commerce Dashboard Schema  
[View the complete Dashboard schema example →](./examples/dashboard-schema.json)

### Blog CMS Schema
[View the complete CMS schema example →](./examples/cms-schema.json)

---

## Best Practices

### ✅ DO:
- **Use semantic component names** for AI understanding
- **Write descriptive AI comments** for all properties
- **Leverage global functions** for reusable logic
- **Test expressions** in the expression editor
- **Review AI suggestions** but make your own decisions
- **Use TypeScript** for better developer experience

### ❌ DON'T:
- **Write unsafe expressions** without validation
- **Ignore AI security warnings** about user input
- **Create deeply nested component hierarchies**
- **Use cryptic property names** without documentation
- **Override AI suggestions** without understanding them
- **Skip accessibility considerations**

---

## FAQ

### Q: Can I use this schema with my existing React project?
**A:** Yes! The schema generates standard React components that work with any existing project. Just copy the generated components into your src folder.

### Q: How do I add support for my favorite UI library?
**A:** Create a plugin that maps schema components to your library's components. See the [Plugin Development Guide](./PLUGIN_SYSTEM.md) for details.

### Q: Can I edit the generated code directly?
**A:** Absolutely! The generated code is clean, readable, and documented. You can edit it like any normal React/Vue/Svelte project.

### Q: How does the AI understand my custom expressions?
**A:** The schema includes rich metadata, dependencies, and comments that give AI full context about your code's intent and structure.

### Q: Is there a limit to complexity?
**A:** No! The schema supports any level of complexity - from simple buttons to complete applications with real-time data, complex state management, and custom business logic.

---

## Contributing

### Schema Evolution
Have ideas for improving the schema? We welcome contributions:

1. **Open an issue** describing the enhancement
2. **Discuss the change** with the community  
3. **Submit a PR** with schema updates
4. **Update documentation** and examples

### Plugin Development
Build plugins for new frameworks or libraries:

1. **Follow the plugin interface** defined in [PLUGIN_SYSTEM.md](./PLUGIN_SYSTEM.md)
2. **Test with real projects** to ensure compatibility
3. **Submit to the plugin registry** for community use

---

## Conclusion

The Rise Component Schema v1.0.0 represents a new paradigm in low-code development:

- **🎯 Users have complete control** with custom expressions and global functions
- **🤖 AI provides intelligent assistance** without taking over
- **🔓 Zero vendor lock-in** with clean, standard code output  
- **🔮 Future-proof architecture** supporting any framework or library

This schema enables Rise to become the **Tesla of low-code platforms** - no compromises, maximum empowerment, and unlimited extensibility.

---

**Last Updated**: October 25, 2025  
**Schema Version**: 1.0.0  
**Status**: ✅ Complete  
**Next Review**: Schema v1.1.0 planning (Q1 2026)