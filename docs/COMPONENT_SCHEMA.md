# Component Schema Specification (MVP)

> The JSON manifest format for Rise MVP - simplified for rapid development while maintaining plugin-ready architecture.

## Philosophy

Rise's MVP component schema balances simplicity with future extensibility:

1. **🎯 Focus on Core Value**: Visual editing + AI assistance + clean React generation
2. **🔓 Plugin-Ready Architecture**: Semantic structure for future framework plugins
3. **🤖 AI Integration**: Rich metadata for intelligent assistance
4. **🚀 Rapid Development**: Minimal complexity to ship MVP in 8-10 weeks

---

## MVP Schema Structure

### Core Components Only

```json
{
  "schemaVersion": "1.0.0-mvp",
  "metadata": { /* Project info */ },
  "components": { /* Component definitions */ },
  "globalFunctions": { /* Custom JavaScript functions */ },
  "globalState": { /* Simple reactive variables */ },
  "ai": { /* AI integration settings */ }
}
```

**Deferred for Post-MVP**:
- ❌ Complex plugin system
- ❌ Advanced routing
- ❌ Database integration  
- ❌ Deployment configuration
- ❌ Performance analytics
- ❌ Migration system

---

## Project Metadata

```json
{
  "metadata": {
    "projectName": "ChatApp",
    "description": "Real-time chat application",
    "framework": "react",
    "typescript": false,
    "createdAt": "2025-10-25T10:00:00Z",
    "updatedAt": "2025-10-25T15:30:00Z",
    "author": "user@example.com",
    
    "ai": {
      "enabled": true,
      "provider": "claude",
      "assistanceLevel": "copilot"
    }
  }
}
```

---

## Component Definition

```json
{
  "components": {
    "comp_user_card_001": {
      "id": "comp_user_card_001",
      "displayName": "UserCard",
      "type": "composite",
      "category": "user-interface",
      "aiGenerated": false,
      "aiDescription": "User profile card with avatar and contact info",
      
      "properties": {
        "user": {
          "type": "prop",
          "dataType": "object",
          "required": true,
          "description": "User object from parent component"
        },
        
        "displayName": {
          "type": "expression",
          "expression": "user.firstName + ' ' + user.lastName",
          "dependencies": ["props.user.firstName", "props.user.lastName"],
          "description": "Full name computed from first and last name"
        },
        
        "badgeText": {
          "type": "customFunction",
          "functionName": "getUserBadge",
          "args": ["props.user"],
          "description": "Dynamic badge text based on user status"
        }
      },
      
      "localState": {
        "isHovered": {
          "type": "boolean",
          "default": false,
          "description": "Whether card is currently hovered"
        }
      },
      
      "eventHandlers": {
        "onClick": {
          "type": "navigation",
          "target": "/profile/${props.user.id}",
          "description": "Navigate to user profile page"
        }
      },
      
      "styling": {
        "className": "user-card",
        "conditionalClasses": {
          "hover": "state.isHovered",
          "premium": "user.isPremium"
        }
      },
      
      "children": [
        "comp_avatar_001",
        "comp_user_info_001"
      ],
      
      "ai": {
        "lastReview": "2025-10-25T15:30:00Z",
        "suggestions": [
          "Consider adding loading state for user data",
          "Add accessibility attributes for screen readers"
        ],
        "userFeedback": "implemented accessibility suggestion"
      }
    }
  }
}
```

---

## Property Types (MVP)

### 1. Static Values
```json
{
  "title": {
    "type": "static",
    "value": "Welcome to Rise",
    "description": "Fixed page title"
  }
}
```

### 2. Props (Component Inputs)
```json
{
  "user": {
    "type": "prop",
    "dataType": "object",
    "required": true,
    "description": "User data object",
    "schema": {
      "id": "string",
      "name": "string",
      "email": "string"
    }
  }
}
```

### 3. Simple Expressions (Sandboxed)
```json
{
  "displayText": {
    "type": "expression",
    "expression": "user.name.toUpperCase()",
    "dependencies": ["props.user.name"],
    "description": "User name in uppercase",
    "validation": "safe"
  }
}
```

### 4. Custom Functions (Full Power)
```json
{
  "formattedPrice": {
    "type": "customFunction",
    "functionName": "formatCurrency",
    "args": ["props.price", "global.userCurrency"],
    "description": "Price formatted according to user's currency preference"
  }
}
```

### 5. Local State
```json
{
  "isVisible": {
    "type": "state",
    "dataType": "boolean",
    "default": false,
    "description": "Controls component visibility"
  }
}
```

### 6. Global State References
```json
{
  "currentUser": {
    "type": "globalState",
    "variable": "currentUser",
    "description": "Currently authenticated user"
  }
}
```

---

## Global Functions (MVP Core Feature)

```json
{
  "globalFunctions": {
    "formatCurrency": {
      "code": "function formatCurrency(amount, currency = 'USD') {\n  return new Intl.NumberFormat('en-US', {\n    style: 'currency',\n    currency: currency\n  }).format(amount);\n}",
      "description": "Formats monetary amounts with proper currency symbols",
      "parameters": [
        {"name": "amount", "type": "number", "required": true},
        {"name": "currency", "type": "string", "required": false, "default": "USD"}
      ],
      "returns": "string",
      "author": "user",
      "aiGenerated": false,
      "triggers": [],
      
      "ai": {
        "reviewStatus": "approved",
        "securityWarnings": [],
        "performanceNotes": ["Function is pure and fast"],
        "suggestions": ["Consider memoization for frequent calls"]
      }
    },
    
    "validateEmail": {
      "code": "function validateEmail(email) {\n  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n  return regex.test(email);\n}",
      "description": "Validates email address format",
      "parameters": [{"name": "email", "type": "string", "required": true}],
      "returns": "boolean",
      "author": "ai",
      "aiGenerated": true,
      "triggers": ["form:email:change"],
      
      "ai": {
        "reviewStatus": "auto-approved",
        "securityWarnings": [],
        "confidence": 0.95
      }
    }
  }
}
```

### Function Triggers (Simplified)
```json
{
  "onAppMount": {
    "code": "function onAppMount() {\n  console.log('App started');\n  trackEvent('app_launch');\n}",
    "triggers": ["app:mount"],
    "description": "Runs when application starts"
  }
}
```

**Available Triggers (MVP)**:
- `app:mount`, `app:unmount`
- `component:mount`, `component:unmount`
- `global:{variable}:changed`
- `route:changed` (basic routing only)

---

## Global State (Simplified)

```json
{
  "globalState": {
    "currentUser": {
      "type": "reactive",
      "dataType": "object",
      "default": null,
      "description": "Currently authenticated user",
      "schema": {
        "id": "string",
        "name": "string",
        "email": "string",
        "avatar": "string"
      }
    },
    
    "theme": {
      "type": "reactive",
      "dataType": "string",
      "default": "light",
      "options": ["light", "dark"],
      "description": "Application theme preference"
    },
    
    "isLoading": {
      "type": "reactive",
      "dataType": "boolean",
      "default": false,
      "description": "Global loading state"
    }
  }
}
```

---

## AI Integration (MVP Focus)

### AI Assistance Configuration
```json
{
  "ai": {
    "enabled": true,
    "provider": "claude",
    "features": {
      "componentGeneration": true,
      "codeReview": true,
      "expressionHelp": true,
      "functionGeneration": true
    },
    "userPreferences": {
      "autoAcceptSimple": false,
      "reviewLevel": "detailed",
      "privacyMode": true
    }
  }
}
```

### Component-Level AI Data
```json
{
  "ai": {
    "generated": {
      "prompt": "Create a user card with avatar and contact info",
      "timestamp": "2025-10-25T10:00:00Z",
      "confidence": 0.92
    },
    "reviewed": {
      "lastReview": "2025-10-25T15:30:00Z",
      "findings": [
        "Good component structure",
        "Consider adding loading state"
      ],
      "status": "approved"
    },
    "userFeedback": {
      "accepted": ["component structure"],
      "rejected": ["complex styling suggestion"],
      "customized": ["simplified event handlers"]
    }
  }
}
```

---

## Plugin-Ready Architecture (Not Implemented in MVP)

### Framework-Agnostic Property Types
```json
{
  "semanticType": "InteractiveButton",
  "frameworkHints": {
    "react": { "elementType": "button", "eventProp": "onClick" },
    "vue": { "elementType": "button", "eventProp": "@click" },
    "svelte": { "elementType": "button", "eventProp": "on:click" }
  }
}
```

### Plugin Interface Placeholders
```json
{
  "pluginSupport": {
    "framework": "react",
    "version": "1.0.0",
    "capabilities": {
      "typescript": false,
      "stateManagement": "react-hooks",
      "routing": "react-router"
    }
  }
}
```

**Note**: Plugin system architecture is defined but not implemented in MVP

---

## Generated React Code Examples

### Simple Component
**Schema**:
```json
{
  "id": "comp_button_001",
  "displayName": "Button",
  "properties": {
    "title": { "type": "static", "value": "Click me" },
    "onClick": { "type": "eventHandler", "action": "alert('Clicked!')" }
  }
}
```

**Generated Code**:
```jsx
import React from 'react';

/**
 * Button component
 * @generated Rise MVP v1.0.0
 */
export default function Button({ onClick }) {
  const handleClick = () => {
    alert('Clicked!');
    if (onClick) onClick();
  };

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func
};
```

### Component with Expressions and Custom Functions
**Schema**:
```json
{
  "id": "comp_user_card_001",
  "displayName": "UserCard",
  "properties": {
    "displayName": {
      "type": "expression",
      "expression": "user.firstName + ' ' + user.lastName"
    },
    "badgeText": {
      "type": "customFunction",
      "functionName": "getUserBadge",
      "args": ["props.user"]
    }
  },
  "localState": {
    "isHovered": { "type": "boolean", "default": false }
  }
}
```

**Generated Code**:
```jsx
import React, { useState, useMemo } from 'react';
import { getUserBadge } from '../utils/globalFunctions.js';

/**
 * User profile card with badge
 * @generated Rise MVP v1.0.0
 */
export default function UserCard({ user }) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Simple expression (sandboxed)
  const displayName = useMemo(() => 
    user.firstName + ' ' + user.lastName,
    [user.firstName, user.lastName]
  );
  
  // Custom function (full power)
  const badgeText = getUserBadge(user);
  
  return (
    <div 
      className={`user-card ${isHovered ? 'hover' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2>{displayName}</h2>
      <span className="badge">{badgeText}</span>
    </div>
  );
}

UserCard.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired
  }).isRequired
};
```

---

## MVP vs. Future Comparison

### What's in MVP
✅ **Core Component System**
- Visual component tree editing
- Property system (static, expression, custom function, prop)
- Local state management
- Basic event handlers

✅ **Two-Tier Expression System**
- Simple expressions (sandboxed JavaScript)
- Custom functions (full JavaScript power)
- Global function management with triggers

✅ **AI Integration**
- Component generation from prompts
- Code review and suggestions
- Expression assistance

✅ **React Code Generation**
- Clean, documented React components
- Proper TypeScript support (optional)
- ESLint-compliant output

### What's Deferred
❌ **Advanced Features**
- Plugin system implementation
- Multiple framework support
- Visual connection editor
- Step-through debugger
- Bidirectional sync

❌ **Enterprise Features**
- Team collaboration
- Version control integration
- Advanced deployment
- Component marketplace

---

## Best Practices for MVP

### ✅ DO:
- **Keep components simple** - avoid deep nesting
- **Use custom functions** for complex logic
- **Leverage AI assistance** but always review suggestions
- **Write clear descriptions** for all components and functions
- **Test expressions** before applying to components

### ❌ DON'T:
- **Create circular dependencies** between components
- **Write unsafe expressions** in simple expression fields
- **Ignore AI security warnings** about custom functions
- **Create deeply nested component hierarchies**
- **Use cryptic naming** without descriptions

---

## Migration Strategy

### Future Plugin Support
The MVP schema is designed to easily extend for plugin support:

```json
{
  "components": {
    "comp_001": {
      "framework": "react",
      "pluginData": {
        "vue": { /* Vue-specific data when Vue plugin is added */ },
        "svelte": { /* Svelte-specific data when Svelte plugin is added */ }
      }
    }
  }
}
```

### Schema Evolution
```json
{
  "schemaVersion": "1.0.0-mvp",
  "upgradeNotes": [
    "v1.1.0 will add plugin system",
    "v1.2.0 will add visual debugging",
    "v2.0.0 will add team collaboration"
  ]
}
```

---

## Implementation Priority

### Phase 1: Foundation (Weeks 1-2)
- Basic component CRUD operations
- Simple property editing
- Static value and prop support

### Phase 2: Expressions (Weeks 3-4)
- Simple expression editor and validation
- Custom function editor
- Global function management

### Phase 3: AI Integration (Weeks 5-6)
- Component generation from prompts
- Code review suggestions
- Expression assistance

### Phase 4: Polish (Weeks 7-8)
- Error handling and validation
- Performance optimization
- Documentation and examples

---

## Success Criteria

### MVP Must Support:
✅ **Basic Workflows**
- Create project with 20+ components
- Edit properties with expressions and custom functions
- Generate clean React code that compiles and runs
- Use AI to generate components from natural language

✅ **Quality Standards**
- Generated code passes ESLint without errors
- Expression system blocks dangerous operations
- AI suggestions are relevant and helpful
- Performance remains responsive with large projects

✅ **Future Readiness**
- Schema can be extended for plugin system
- Architecture supports multiple frameworks
- Component definitions are framework-agnostic
- Clean separation between manifest and generated code

---

This simplified component schema enables Rise MVP to deliver core value in 8-10 weeks while maintaining the architectural foundation for future plugin-based extensibility.

---

**See Also**:
- [MVP Roadmap](./MVP_ROADMAP.md) - Implementation timeline
- [Security Model](./SECURITY.md) - Expression safety details
- [Examples](./EXAMPLES.md) - Real component schemas
- [Testing Strategy](./TESTING_STRATEGY.md) - Validation approach

---

**Last Updated**: October 25, 2025  
**Schema Version**: 1.0.0-mvp  
**Status**: 🎯 MVP Ready