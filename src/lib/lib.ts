import Database from "@tauri-apps/plugin-sql";

const db = Database.load("sqlite:data.db");

export interface Task {
  id: number;
  title: string;
  project_id: number;
  parent_id?: number;
}

// For getting all tasks
export async function getTasks(): Promise<Task[]> {
  const result = await (await db).select("SELECT * FROM tasks;");
  return result as Task[];
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
export async function createProject(name: string, client_id: number) {
  try {
    await (
      await db
    ).execute("INSERT INTO projects(name, client_id ) VALUES(?,?)", [
      name,
      client_id,
    ]);
    return 200;
  } catch (error) {
    console.log(error);
    return 500;
  }
}

export async function createClient(name: string, projectNumber: number) {
  try {
    await (
      await db
    ).execute("INSERT INTO clients(name, projectNumber) VALUES(?,?)", [
      name,
      projectNumber,
    ]);
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
