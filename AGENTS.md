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

### Delete Functionality Implementation and Debugging
- **Frontend Delete**: Implemented event-driven delete in `TaskBit.svelte` with `createEventDispatcher`, listened in `+page.svelte` with error handling (alert + console log), reloads tasks on success
- **Backend Delete**: `delete_task` command added with async DB operation, added println! logging for debugging
- **Current Issue**: App restarts on delete—likely backend panic or DB error
- **Debug Checklist**:
  - Check if database.sql exists and is accessible
  - Verify tasks table schema (id INTEGER, title TEXT, project_id INTEGER)
  - Review Rust console logs for failure points
  - Test direct invoke of delete_task
  - Ensure no DB locking or invalid task_ids
- **Next Steps**: Run app, attempt delete, check logs to isolate cause

### Database Frontend and Backend Implementation
- **Completed**: Full database integration for tasks, projects, and clients
- **Duration**: Approximately 3 days
- **Backend (lib.ts)**:
  - Added `Task` interface for type safety
  - Implemented `getTasks()`, `createTask()`, `deleteTask()`, `createProject()`, `createClient()` functions
  - Fixed async DB loading and SQL placeholders for SQLite compatibility
- **Frontend Components**:
  - Created `AddTask.svelte` for dynamic routes (`/[project_id]`)
  - Created `AddProject.svelte` and `AddClient.svelte` for projects page
  - Integrated event-driven updates and filtering by project
- **Database Schema**:
  - Updated `schema.sqlite` with correct AUTOINCREMENT and DEFAULT syntax
  - Ensured table constraints and foreign keys
- **Integration**:
  - Connected SvelteKit routes to DB via Tauri SQL plugin
  - Added migrations in `lib.rs` for automatic table creation
  - Fixed TypeScript errors and reactive updates
- **Result**: Functional CRUD operations for tasks/projects/clients, with proper error handling and UI consistency

### Project Navigation and Dynamic Page Optimization
- **Completed**: Clickable project cards and optimized task filtering
- **Duration**: Single session implementation
- **Project Card Navigation**:
  - Made project titles clickable in `ProjectCard.svelte`
  - Changed `<h3>` to `<button>` element for accessibility compliance
  - Added `on:click={() => goto(\`/\${project.id}\`)}` navigation handler
  - Added hover styling (`hover:text-blue-600`) for better UX
- **Dynamic Page Optimization**:
  - Updated `routes/[project_id]/+page.svelte` to use `getProjectTask(projectId)` instead of fetching all tasks and filtering
  - Improved performance by moving filtering to database level
  - Reduced unnecessary data transfer and processing
- **Result**: Seamless navigation between project overview and individual project pages, with efficient task loading

### Project Creation Client Selection
- **Completed**: Added client selection dropdown to project creation
- **Duration**: Single session implementation
- **Backend Fix**:
  - Updated `createProject()` function to accept `clientId: number = 0` parameter
  - Fixed SQL query to insert both name and client_id values: `VALUES(?, ?)`
  - Resolved "1 values for 2 columns" database error
- **Frontend Enhancement**:
  - Added client selection dropdown in `AddProject.svelte` similar to task creation
  - Imported `onMount` and added client loading logic
  - Added `<select>` with "No Client" option (value 0) and client list
  - Updated form submission to pass `selectedClientId`
  - Added consistent styling with `.add-project-select` class
- **UX Features**:
  - Client selection is optional (defaults to 0 = "No Client")
  - Dropdown populates dynamically from database
  - Maintains existing form layout and styling
- **Result**: Projects can now be associated with clients during creation, fixing SQL errors and providing requested functionality

### Context-Aware Task Creation
- **Completed**: Removed project selection dropdown from task creation, made it context-aware
- **Duration**: Single session implementation
- **Component Simplification**:
  - Removed `onMount`, `projects` state, and `selectedProjectId` from `AddTask.svelte`
  - Added `export let projectId: number` prop for explicit project context
  - Removed `<select>` dropdown and `.add-task-select` CSS styling
  - Simplified form to just input + button layout
- **Context Integration**:
  - Updated `routes/[project_id]/+page.svelte` to pass `projectId` prop to `AddTask`
  - Tasks now automatically assign to the current project context
- **Benefits**:
  - **Streamlined UX**: No manual project selection needed in project-specific contexts
  - **Reduced Complexity**: AddTask component is now simpler and more focused
  - **Explicit Context**: Project association is clear and enforced by component usage
  - **Future-Proof**: Component can be reused with explicit project context anywhere
- **Result**: Task creation is now seamless within project pages, eliminating dropdown friction while maintaining flexibility for other use cases

### Task Reload Bug Fix
- **Completed**: Fixed task list not updating after adding new tasks
- **Duration**: Single session implementation
- **Issue Identified**:
  - `createTask()` function was missing `await` for database execute operation
  - Function returned `200` before database insert completed
  - `loadTasks()` ran immediately after, before new task was saved
  - UI appeared to succeed but didn't show new tasks
- **Fix Applied**:
  - Added missing `await` to `(await db).execute()` call in `createTask`
  - Now properly waits for database operation to complete before returning success
- **Verification**:
  - Other create functions (`createProject`, `createClient`) already had correct awaiting
  - `createTask` was the only one missing the outer `await`
- **Result**: Task creation now properly waits for database completion, ensuring UI updates immediately with new tasks

### Form Submission Enhancement
- **Completed**: Added Enter key support for all form submissions
- **Duration**: Single session implementation
- **Components Updated**:
  - `AddTask.svelte`: Converted div to `<form>` with `on:submit|preventDefault={addTask}`
  - `AddProject.svelte`: Converted div to `<form>` with `on:submit|preventDefault={addProject}`
  - `AddClient.svelte`: Converted div to `<form>` with `on:submit|preventDefault={addClient}`
- **Changes Made**:
  - Wrapped form elements in `<form>` tags
  - Added `on:submit|preventDefault` event handlers
  - Changed button `on:click` to `type="submit"`
  - Maintained existing styling and functionality
- **UX Improvement**:
  - Users can now press Enter in any input field to submit forms
  - Eliminates need to click submit buttons
  - Maintains accessibility with proper form semantics
- **Result**: Enhanced user experience with standard form submission behavior across all creation forms

### Dynamic Project Details Modal
- **Completed**: Implemented dynamic modal for project details
- **Duration**: Single session implementation
- **Components Created**:
  - `ProjectModal.svelte`: Modal component with overlay, project details display
  - `stores/modal.ts`: Svelte store for modal state management
- **Features**:
  - **Dynamic Content**: Shows name, description, due date, status, progress, and team
  - **Null Handling**: Gracefully displays "No description available" or "No due date set" for empty fields
  - **Accessibility**: Keyboard navigation (Escape to close), click-outside-to-close, proper ARIA labels
  - **Responsive Design**: Mobile-friendly with proper spacing and overflow handling
  - **State Management**: Clean store-based approach for opening/closing modal
- **Integration**:
  - Updated `ProjectCard.svelte` "View Details" button to trigger modal
  - Added modal to `/projects/+page.svelte`
  - Fixed database integration to properly fetch `dueDate` field
- **Database Updates**:
  - Updated `Projects` interface to include `dueDate: number`
  - Modified `getProjectItem()` to select dueDate field
  - Updated `createProject()` to accept description and dueDate parameters
- **Result**: Users can now click "View Details" on any project card to see comprehensive project information in a clean, accessible modal interface

### Edit Project Description Feature
- **Completed**: Added inline editing for project descriptions using pencil icon method
- **Duration**: Single session implementation
- **Pattern**: Reused the same editing pattern as task renaming (pencil icon → inline textarea → Enter/Escape handling)
- **Components Updated**:
  - `ProjectModal.svelte`: Added editing state, pencil icon button, textarea input, keyboard handling
  - `lib.ts`: Fixed `updateProjectDescription()` function (was using wrong SQL method and parameters)
  - `projects/+page.svelte`: Added event handler for description updates
- **Features**:
  - Pencil icon appears next to "Description" header
  - Click to enter edit mode with auto-focused textarea
  - Enter saves changes, Escape cancels editing
  - Blur also saves changes
  - Real-time database updates with error handling
  - Consistent UI/UX with task renaming functionality
- **Result**: Users can now edit project descriptions directly in the modal using the familiar pencil icon interface

## Current Implementation Plan

### Phase 0: Implement Recursive Task Selection (Parent-Child Relationships)

1. **Update Tasks interface in `src/lib/lib.ts`**:
   - Add `children?: Tasks[]` property to support hierarchical structure

2. **Create task tree building functions in `src/lib/lib.ts`**:
   - `buildTaskTree(tasks: Tasks[]): Tasks[]` - converts flat task array to hierarchical tree
   - `flattenTaskTree(tasks: Tasks[]): Tasks[]` - converts tree back to flat array for operations

3. **Update task display components**:
   - Modify `ProjectSection.svelte` to render hierarchical task tree with proper indentation
   - Add recursive rendering logic for parent-child relationships
   - Implement visual hierarchy with nested indentation and connecting lines

4. **Update task creation UI**:
   - Add parent task selection dropdown in `AddTask.svelte`
   - Filter dropdown to show only tasks from current project
   - Allow selecting "No Parent" for root-level tasks

5. **Update task operations for hierarchy**:
   - Modify delete operations to handle cascading deletes (delete children when parent is deleted)
   - Update task movement/renaming to maintain hierarchical integrity
   - Ensure toggle operations work correctly with nested tasks

6. **Database considerations**:
   - Verify `parent_id` foreign key constraints are properly set
   - Consider adding database triggers for cascade operations if needed
   - Ensure recursive queries don't cause performance issues

### Phase 1: Add Delete Buttons to ClientCard and ProjectCard

1. **Add delete functions in `src/lib/lib.ts`**:
   - Add `deleteClient(client_id: number)`: `DELETE FROM clients WHERE id = ?`
   - Add `deleteProject(project_id: number)`: `DELETE FROM projects WHERE id = ?`
   - Both with try/catch, return 200/500

2. **Update `src/lib/Components/ClientCard.svelte`**:
   - Import `createEventDispatcher`
   - Add delete button in header (next to project count span)
   - Button: `opacity-0 group-hover:opacity-100`, red on hover, X icon
   - Dispatch 'delete' event with `client.id`

3. **Update `src/lib/Components/ProjectCard.svelte`**:
   - Import `createEventDispatcher`
   - Add delete button in header (next to status span)
   - Same styling as ClientCard delete button
   - Dispatch 'delete' event with `project.id`

4. **Update `src/routes/clients/+page.svelte`**:
   - Add `on:delete={handleDelete}` to `<ClientCard>`
   - Add `async handleDelete(event) { const result = await lib.deleteClient(event.detail); result === 200 ? loadClients() : alert('Failed'); }`

5. **Update `src/routes/projects/+page.svelte`**:
   - Add `on:delete={handleDelete}` to `<ProjectCard>`
   - Add `async handleDelete(event) { const result = await lib.deleteProject(event.detail); result === 200 ? loadProjects() : alert('Failed'); }`

6. **Update `src/routes/[project_id]/+page.svelte`**:
   - Add `on:delete={handleDelete}` to `<TaskBit>`
   - Add `async handleDelete(event) { const result = await lib.deleteTask(event.detail); result === 200 ? loadTasks() : alert('Failed'); }`

### Phase 2: Replace TaskBit with TaskItem and Add Rename

1. **Complete `renameTask` in `src/lib/lib.ts`**:
   - Add try/catch around the execute call
   - Return 200 on success, 500 on error

2. **Add `updateTaskComplete` in `src/lib/lib.ts`**:
   - `UPDATE tasks SET complete = ? WHERE id = ?`
   - With try/catch, return 200/500

3. **Update `src/lib/Components/TaskItem.svelte`**:
   - Add pencil icon button next to delete button (shows on hover)
   - On click: replace text with input field, focus input
   - Enter: dispatch 'rename' with new name and task.id, restore text display
   - Escape: cancel, restore original text
   - Add rename state management (editing mode)

4. **Update `src/routes/[project_id]/+page.svelte`**:
   - Replace `TaskBit` import with `TaskItem`
   - Replace component usage with:
     ```svelte
     <TaskItem
       task={{
         id: task.id,
         text: task.title,
         completed: task.complete === 1,
         priority: "medium",
         project: projectName || "Unknown",
         dueDate: null,
         labels: []
       }}
       on:toggle={handleToggle}
       on:delete={handleDelete}
       on:rename={handleRename}
     />
     ```
   - Add `handleToggle`: async update complete in DB, reload tasks
   - Update `handleDelete` and `handleRename` similarly
   - Fetch project name for the adapted task

5. **Update `src/routes/tasks/+page.svelte`**:
   - Add `on:rename` to `ProjectSection`
   - Add `handleRename` function

6. **Update `src/lib/Components/ProjectSection.svelte`**:
   - Forward rename events from TaskItem to parent

### Implementation Notes
- All delete buttons follow the same hover-reveal pattern as existing task components
- Rename uses inline editing with Enter to save, Escape to cancel
- Error handling includes user alerts for all operations
- Database operations maintain consistency with existing patterns
- TaskItem adaptation requires project name lookup in dynamic route
- Foreign key constraints for project/task relationships should be considered (cascade delete or validation)

## Implementation Status: IN PROGRESS 🚧

### Completed Features ✅
All previously planned features have been successfully implemented:

- ✅ Delete buttons added to ClientCard and ProjectCard components
- ✅ Delete functions added to lib.ts with proper error handling
- ✅ Event handling implemented in respective page components
- ✅ TaskBit replaced with TaskItem in dynamic routes
- ✅ Rename functionality added with pencil icon and inline editing
- ✅ Database update functions completed
- ✅ All TypeScript errors resolved
- ✅ Code compiles successfully with only minor warnings

### Next Priority: Recursive Task Selection 🔄
- ⏳ **Phase 0**: Implement recursive task selection for parent-child relationships
- ✅ **Modal Implementation**: Dynamic project details modal completed

### Post-MVP Features 🎯
- **Progress Bar Logic**: Implement dynamic progress calculation based on completed tasks within projects
  - Calculate progress percentage from task completion ratios
  - Update progress bars in real-time as tasks are completed
  - Store progress in database vs. computed on-the-fly
  - Add progress tracking to project creation and editing workflows

- **Truncated Task Description Display**: Show task descriptions in TaskItem component (15 chars max)
  - Add `description?: string` to TaskItem prop interface
  - Display truncated description in metadata section (first 15 chars + "..." if longer)
  - Handle null/undefined/empty descriptions gracefully
  - Style consistently with existing metadata elements (due dates, labels)
  - Provides quick preview of task descriptions without opening modal

### Additional Notes:
- **TaskBit** component is no longer used (replaced by TaskItem)
- **TaskItem** now handles all task display with full functionality (toggle, delete, rename)
- All delete operations include proper error handling and user feedback
- Rename supports inline editing with keyboard shortcuts (Enter/Escape)

- ✅ Delete buttons added to ClientCard and ProjectCard components
- ✅ Delete functions added to lib.ts with proper error handling
- ✅ Event handling implemented in respective page components
- ✅ TaskBit replaced with TaskItem in dynamic routes
- ✅ Rename functionality added with pencil icon and inline editing
- ✅ Database update functions completed
- ✅ All TypeScript errors resolved
- ✅ Code compiles successfully with only minor warnings

### Additional Notes:
- **TaskBit** component is no longer used (replaced by TaskItem)
- **TaskItem** now handles all task display with full functionality (toggle, delete, rename)
- All delete operations include proper error handling and user feedback
- Rename supports inline editing with keyboard shortcuts (Enter/Escape)
