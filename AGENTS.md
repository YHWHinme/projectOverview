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

## Recent Development Updates

### TaskBit Component Creation
- **Created**: `src/lib/Components/TaskBit.svelte` as a simplified task component for dynamic routes
- **Purpose**: Lightweight alternative to TaskItem for database-driven task display
- **Features**:
  - Basic task display with title and project ID
  - Matches TaskItem's visual design and layout
  - Excludes complex features (priority colors, delete buttons, due dates)

### Checkbox Implementation
- **Added**: Functional checkboxes to TaskBit component
- **Styling**: Gray default color (`border-gray-400`) with filled state (`bg-gray-500`)
- **Functionality**:
  - Click to toggle completion state
  - Visual checkmark icon when completed
  - Line-through text styling for completed tasks
- **Props**: Added `completed` prop with default `false`

### Database Connection Fix
- **Issue**: Relative path `"../database/database.sql"` failed at runtime
- **Solution**: Implemented absolute path resolution using `std::env::current_exe()`
- **Implementation**:
  - Added `use std::env;` import
  - Path calculation: `exe_path.parent().unwrap().join("database/database.sql")`
  - Proper error handling with `rusqlite::Error` conversion
- **Result**: Database connections now work reliably in both development and production

### Component Architecture
- **TaskItem**: Full-featured component for `/tasks` page with mock data
- **TaskBit**: Simplified component for dynamic routes (`/[project_id]`) with database data
- **Separation**: Clean separation of concerns between mock and real data components

### Build & Testing
- **Successful builds**: All changes compile without errors
- **TypeScript compliance**: Only expected warnings about unused props
- **Tauri integration**: Backend commands work correctly with frontend
- **Database persistence**: Tasks load from SQLite database in dynamic routes

### Code Quality
- **Error handling**: Proper error propagation and user feedback
- **Type safety**: Full TypeScript support with explicit types
- **Performance**: Efficient database queries and component rendering
- **Maintainability**: Clean separation between components and clear prop interfaces
