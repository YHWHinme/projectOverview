import Database from "@tauri-apps/plugin-sql";

const db = Database.load("sqlite:data.db");

// NOTE: Tasks acquire functions
export interface Tasks {
  id: number;
  title: string;
  complete: number;
  project_id: number;
  parent_id?: number;
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

// For getting all projects
export interface Projects {
  id: number;
  name: string;
  client_id: number;
}

export async function getProjects(): Promise<Projects[]> {
  const result = await (await db).select("SELECT * FROM projects;");
  return result as Projects[];
}

// For getting all clients
export interface Clients {
  id: number;
  name: string;
  projectNumber: number;
}

export async function getClients(): Promise<Clients[]> {
  const result = await (await db).select("SELECT * FROM clients;");
  return result as Clients[];
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

export async function createTask(
  title: string,
  project_id: number,
  parent_id?: number,
) {
  try {
    (await db).execute(
      "INSERT INTO tasks(title, project_id, parent_id) VALUES(?,?,?)",
      [title, project_id, parent_id],
    );
    return 200;
  } catch (err) {
    console.log(err);
    return 500;
  }
}

// Creating a new project
export async function createProject(name: string) {
  try {
    await (
      await db
    ).execute("INSERT INTO projects(name, client_id ) VALUES(?)", [name]);
    return 200;
  } catch (error) {
    console.log(error);
    return 500;
  }
}

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
// Schema for database
//
// CREATE TABLE sqlite_sequence(name,seq);
//
// CREATE TABLE clients(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, projectNumber INTEGER NOT NULL DEFAULT 0);
//
// CREATE TABLE projects(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, client_id INTEGER, CONSTRAINT fk_client_id FOREIGN KEY (client_id) REFERENCES clients(id));
//
// CREATE TABLE tasks(
// id INTEGER PRIMARY KEY AUTOINCREMENT,
// title TEXT NOT NULL,
// project_id INTEGER NOT NULL,
// parent_id INTEGER,
// CONSTRAINT fk_project_id FOREIGN KEY (project_id) REFERENCES projects(id)
// );
