# Agent Guidelines for projectOverseer

**Tech Stack**: Tauri + SQLite + SvelteKit + TypeScript + Tailwind CSS

## Build/Lint/Test Commands

- **Build frontend**: `deno run build`
- **Dev server**: `deno run dev`
- **Type check**: `deno run check` (svelte-check with TypeScript)
- **Tauri dev**: `deno run tauri dev`
- **Rust build**: `cargo build` (in src-tauri/)
- **No linting or testing commands configured**

## Code Style Guidelines

### TypeScript/JavaScript

- Strict TypeScript with explicit type annotations
- ES6 modules with named imports/exports
- camelCase for variables/functions, PascalCase for components
- Async/await for promises, try/catch for error handling
- Module resolution: bundler (Vite)

### Svelte

- SvelteKit file structure with +page.svelte, +layout.svelte
- TypeScript in script blocks: `<script lang="ts">`
- Tailwind CSS for styling (no custom CSS framework)
- Reactive statements with `$:` syntax
- Component props with TypeScript interfaces

### Rust (Tauri backend)

- Rust 2021 edition, minimum version 1.70
- snake_case for functions/variables
- Error handling with `Result<T, E>` and `?` operator
- Tauri commands with `#[tauri::command]` decorator
- Serde for JSON serialization with derive macros
- SQLite database integration with rusqlite

### General

- No Prettier/ESLint/formatter configured - follow existing patterns
- Import organization: external dependencies first, then internal ($lib)
- Consistent indentation, semicolons required
- No Cursor rules or Copilot instructions configured
