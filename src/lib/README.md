# Root Directory Utility

This utility provides functions to identify and work with the project's root directory in the Next.js application.

## Usage

### Importing the utilities

```typescript
import { getRootDir, resolveFromRoot, ROOT_DIR } from '@/lib';
```

### Getting the root directory

```typescript
// Get the root directory as a string
const rootDir = getRootDir();
console.log(rootDir); // e.g., /home/user/project
```

### Resolving paths from root

```typescript
// Resolve a path relative to the project root
const configPath = resolveFromRoot('config', 'app.json');
console.log(configPath); // e.g., /home/user/project/config/app.json

// Works with multiple path segments
const dataPath = resolveFromRoot('data', 'users', 'profile.json');
console.log(dataPath); // e.g., /home/user/project/data/users/profile.json
```

### Using the ROOT_DIR constant

```typescript
// Import the constant directly
import { ROOT_DIR } from '@/lib';

console.log(ROOT_DIR); // e.g., /home/user/project
```

## Use Cases

### API Routes

Use in API routes to read files from the project directory:

```typescript
import { resolveFromRoot } from '@/lib';
import fs from 'fs';

export async function GET() {
  const configPath = resolveFromRoot('config', 'settings.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  
  return Response.json(config);
}
```

### Server Components

Use in server components to access files:

```typescript
import { resolveFromRoot } from '@/lib';
import fs from 'fs/promises';

export default async function DataPage() {
  const dataPath = resolveFromRoot('data', 'content.md');
  const content = await fs.readFile(dataPath, 'utf-8');
  
  return <div>{content}</div>;
}
```

### Configuration Loading

```typescript
import { resolveFromRoot } from '@/lib';
import { readFile } from 'fs/promises';

export async function loadConfig() {
  const configPath = resolveFromRoot('config', 'app.json');
  const config = await readFile(configPath, 'utf-8');
  return JSON.parse(config);
}
```

## Notes

- These utilities use `process.cwd()` which returns the directory from which the Node.js process was started
- In Next.js, this is typically the project root directory
- These utilities are only available in server-side code (API routes, server components, etc.)
- They cannot be used in client components as `process` is not available in the browser
