# Agent Guidelines for projectOverseer

## Build/Lint/Test Commands
- **Build frontend**: `npm run build`
- **Dev server**: `npm run dev`
- **Type check**: `npm run check`
- **Tauri dev**: `npm run tauri:dev`
- **Rust build**: `cargo build` (in src-tauri/)
- **No dedicated lint/test commands configured**

## Code Style Guidelines

### TypeScript/JavaScript
- Use strict TypeScript with explicit types
- ES6 imports/exports
- camelCase for variables/functions
- PascalCase for components/classes
- Async/await for promises
- Error handling: try/catch blocks

### Svelte
- Standard SvelteKit file structure
- Script blocks use TypeScript (`<script lang="ts">`)
- Tailwind CSS classes for styling
- Reactive statements with `$:` syntax

### Rust (Tauri backend)
- Standard Rust 2021 edition
- snake_case for functions/variables
- Error handling with `expect()` or `?` operator
- Tauri commands decorated with `#[tauri::command]`

### General
- No Prettier/ESLint configured - follow existing patterns
- Import organization: external libs first, then internal
- Consistent indentation and spacing