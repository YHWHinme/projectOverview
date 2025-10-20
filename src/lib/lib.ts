import Database from "@tauri-apps/plugin-sql";

const db = Database.load("sqlite:data.db");

// NOTE: Default Self Project Loader
try {
	(await db).execute("INSERT INTO clients OR IGNORE(name, description) VALUES (?,?)", ["Self", "Yourself"])
} catch (error) {
	console.log("Had an error with the automatic client creation")
	console.log(error)
}

// NOTE: Tasks based functions
export interface Tasks {
  id: number;
  title: string;
  complete: number;
  description: string;
  priority: string;
  project_id: number;
  parent_id?: number;
  children?: Tasks[]; // For hierarchical display
}

export async function getTasks(): Promise<Tasks[]> {
  const result = await (await db).select("SELECT * FROM tasks;");
  return result as Tasks[];
}

export async function getProjectTask(project_id: number): Promise<Tasks[]> {
  const result = await (
    await db
  ).select("SELECT * FROM tasks WHERE project_id=?;", [project_id]);
  return result as Tasks[];
}

// Build hierarchical task tree
export function buildTaskTree(tasks: Tasks[]): Tasks[] {
  const taskMap = new Map<number, Tasks>();
  const rootTasks: Tasks[] = [];

  // First pass: create map of all tasks
  tasks.forEach((task) => {
    taskMap.set(task.id, { ...task, children: [] });
  });

  // Second pass: build hierarchy
  tasks.forEach((task) => {
    const taskWithChildren = taskMap.get(task.id)!;
    if (task.parent_id && taskMap.has(task.parent_id)) {
      // This is a child task
      const parent = taskMap.get(task.parent_id)!;
      if (!parent.children) parent.children = [];
      parent.children.push(taskWithChildren);
    } else {
      // This is a root task
      rootTasks.push(taskWithChildren);
    }
  });

  return rootTasks;
}

// Flatten task tree back to array (for operations that need flat structure)
export function flattenTaskTree(tasks: Tasks[]): Tasks[] {
  const result: Tasks[] = [];

  function traverse(task: Tasks) {
    result.push(task);
    if (task.children) {
      task.children.forEach(traverse);
    }
  }

  tasks.forEach(traverse);
  return result;
}

export async function renameTask(newName: string, taskId: number) {
  try {
    await (
      await db
    ).execute("UPDATE tasks SET title = ? WHERE id=?;", [newName, taskId]);
    return 200;
  } catch (error) {
    console.log(error);
    return 500;
  }
}

// TODO: Add a return function options for number and Promise for Tasks[]
export async function checkTaskComplete(taskId: number) {
  try {
    const result = await (
      await db
    ).select("SELECT * FROM tasks WHERE id = ?", [taskId]);
    return result as Tasks[];
  } catch (error) {
    console.log(error);
    return 500;
  }
}

export async function updateTaskComplete(taskId: number, complete: number) {
  try {
    await (
      await db
    ).execute("UPDATE tasks SET complete = ? WHERE id = ?;", [
      complete,
      taskId,
    ]);
    return 200;
  } catch (error) {
    console.log(error);
    return 500;
  }
}

export async function updateTaskDescription(
  taskId: number,
  taskDescription: string,
) {
  try {
    await (
      await db
    ).execute("UPDATE tasks SET description = ? WHERE id = ?", [
      taskDescription,
      taskId,
    ]);
    return 200;
  } catch (error) {
    console.log(error);
    return 500;
  }
}

// For deleting tasks
export async function deleteTask(task_id: number) {
  try {
    (await db).execute("DELETE FROM tasks WHERE id = ?", [task_id]);
    return 200;
  } catch (error) {
    console.log(error);
    return 500;
  }
}

// For updating tasks
export async function createTask(
  title: string,
  project_id: number,
  parent_id?: number,
) {
  try {
    await (
      await db
    ).execute("INSERT INTO tasks(title, project_id, parent_id) VALUES(?,?,?)", [
      title,
      project_id,
      parent_id,
    ]);
    return 200;
  } catch (err) {
    console.log(err);
    return 500;
  }
}

// NOTE: Project based functions
export interface Projects {
  id: number;
  name: string;
  client_id: number;
  description: string;
  dueDate: number;
}

export async function deleteProject(project_id: number) {
  try {
    await (await db).execute("DELETE FROM projects WHERE id = ?", [project_id]);
    return 200;
  } catch (error) {
    console.log(error);
    return 500;
  }
}

// Creates a project
export async function createProject(
  name: string,
  clientId: number = 0,
  description: string = "",
  dueDate: number | null = null,
) {
  try {
    await (
      await db
    ).execute(
      "INSERT INTO projects(name, client_id, description, dueDate) VALUES(?, ?, ?, ?)",
      [name, clientId, description, dueDate],
    );
    return 200;
  } catch (error) {
    console.log(error);
    return 500;
  }
}

export async function getProjectItem(): Promise<Projects[]> {
  const result = await (
    await db
  ).select("SELECT id, name, client_id, description, dueDate FROM projects;");
  return result as Projects[];
}

export async function getProjects(): Promise<Projects[]> {
  return await getProjectItem(); // Alias for consistency
}

export async function updateProjectDescription(
  projectId: number,
  projectDescription: string,
) {
  try {
    await (
      await db
    ).execute("UPDATE projects SET description = ? WHERE id = ?", [
      projectDescription,
      projectId,
    ]);
    return 200;
  } catch (error) {
    console.log(error);
    return 500;
  }
}

// NOTE: Client based functions
export interface Clients {
  id: number;
  name: string;
  projectNumber: number;
}

export async function getClients(): Promise<Clients[]> {
  const result = await (await db).select("SELECT * FROM clients;");
  return result as Clients[];
}

// Creates a client
export async function createClient(name: string) {
  try {
    await (
      await db
    ).execute("INSERT INTO clients(name, projectNumber) VALUES(?,?)", [name]);
    return 200;
  } catch (error) {
    console.log(error);
    return 500;
  }
}

export async function deleteClient(client_id: number) {
  try {
    await (await db).execute("DELETE FROM clients WHERE id = ?", [client_id]);
    return 200;
  } catch (error) {
    console.log(error);
    return 500;
  }
}

// CREATE TABLE clients(id INTEGER PRIMARY KEY AUTOINCREMENT,
// 	name TEXT NOT NULL,
// 	description TEXT,
// 	projectNumber INTEGER
// );
//
// CREATE TABLE projects(id INTEGER PRIMARY KEY AUTOINCREMENT,
// 	name TEXT NOT NULL,
// 	description TEXT,
// 	client_id INTEGER,
// 	dueDate INTEGER,
// 	CONSTRAINT fk_client_id FOREIGN KEY(client_id) REFERENCES clients(id)
// );
//
// CREATE TABLE tasks(
// id INTEGER PRIMARY KEY AUTOINCREMENT,
// title TEXT NOT NULL,
// description TEXT,
// complete BOOLEAN DEFAULT 0,
// project_id INTEGER NOT NULL,
// parent_id INTEGER,
// CONSTRAINT fk_project_id FOREIGN KEY (project_id) REFERENCES projects(id)
// );
//
