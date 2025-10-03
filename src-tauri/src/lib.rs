use rusqlite::Connection;
use tokio::task::spawn_blocking;

#[derive(serde::Serialize)]
struct TasksOutput {
  id: i32,
  project_id: i32,
  title: String,
}

//Get everything from tasks
#[tauri::command(async)]
async fn get_from_tasks() -> Result<Vec<TasksOutput>, String> {
    let tasks = spawn_blocking(|| -> Result<Vec<TasksOutput>, rusqlite::Error> {
        let conn = Connection::open_in_memory()?;
        conn.execute(
            "CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                project_id INTEGER NOT NULL
            )",
            [],
        )?;

        conn.execute("INSERT INTO tasks (title, project_id) VALUES (?, ?)", [&"hello", &"1"])?;
        conn.execute("INSERT INTO tasks (title, project_id) VALUES (?, ?)", [&"Learn to play golf", &"2"])?;
        conn.execute("INSERT INTO tasks (title, project_id) VALUES (?, ?)", [&"learn sqlite", &"3"])?;

        let mut prep = conn.prepare("SELECT * FROM tasks")?;
        let rows = prep.query_map([], |row| {
            Ok(TasksOutput {
                id: row.get(0)?,
                title: row.get(1)?,
                project_id: row.get(2)?,
            })
        })?;
        let tasks: Vec<TasksOutput> = rows.collect::<Result<Vec<_>, _>>()?;
        Ok(tasks)
    })
    .await
    .map_err(|e| format!("Task panicked: {}", e))?
    .map_err(|e| format!("Database error: {}", e))?;

    Ok(tasks)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_from_tasks])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
