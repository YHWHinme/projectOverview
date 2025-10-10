import Database from "@tauri-apps/plugin-sql";

const db = await Database.load("sqlite:database.db");

// For getting all tasks
export async function getTasks() {
  const result = await db.select("SELECT * FROM tasks;");
  return result;
}

// For deleting tasks
export async function deleteTask(task_id: number) {
  await db.execute("DELETE FROM tasks WHERE id = $1", [task_id]);
}

export async function createTask(
  title: string,
  project_id: number,
  parent_id?: number,
) {
  await db.execute(
    "INSERT INTO tasks(title, project_id, parent_id) VALUES($1,$2,$3)",
    [title, project_id, parent_id],
  );
}

// Creating a new project
export async function createProject(name: string, client_id: number) {
  await db.execute("INSERT INTO projects(name, client_id ) VALUES($1,$2)", [
    name,
    client_id,
  ]);
}

// TODO: Remove doj, it's a pain
export async function createClient(
  name: string,
  doj: number,
  projectNumber: number,
) {
  await db.execute(
    "INSERT INTO clients(name, doj, projectNumber) VALUES($1,$2,$3)",
    [name, doj, projectNumber],
  );
}
// Schema for database
//
// CREATE TABLE sqlite_sequence(name,seq);
//
// CREATE TABLE clients(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, doj TEXT, projectNumber INTEGER NOT NULL DEFAULT 0);
//
// CREATE TABLE projects(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, client_id INTEGER, CONSTRAINT fk_client_id FOREIGN KEY (client_id) R
// EFERENCES clients(id));
//
// CREATE TABLE tasks(
// id INTEGER PRIMARY KEY AUTOINCREMENT,
// title TEXT NOT NULL,
// project_id INTEGER NOT NULL,
// parent_id INTEGER,
// CONSTRAINT fk_project_id FOREIGN KEY (project_id) REFERENCES projects(id)
// );
