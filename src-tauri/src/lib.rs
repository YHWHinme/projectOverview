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
async fn get_all_from_tasks() -> Result<Vec<TasksOutput>, String> {
    let exe_path = env::current_exe().map_err(|e| format!("Failed to get executable path: {}", e))?;
    let db_path = exe_path
        .parent()
        .and_then(|p| p.parent())
        .and_then(|p| p.parent())
        .ok_or_else(|| "Failed to resolve database path from executable location".to_string())?
        .join("database/database.sql");

    let tasks = spawn_blocking(move || -> Result<Vec<TasksOutput>, rusqlite::Error> {
        let conn = Connection::open(&db_path)?;

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

#[tauri::command(async)]
async fn delete_task(task_id: i32) -> Result<String, String> {
    let exe_path = env::current_exe().map_err(|e| format!("Failed to get executable path: {}", e))?;
    let db_path = exe_path
        .parent()
        .and_then(|p| p.parent())
        .and_then(|p| p.parent())
        .ok_or_else(|| "Failed to resolve database path from executable location".to_string())?
        .join("database/database.sql");

    spawn_blocking(move || -> Result<(), rusqlite::Error> {
        let conn = Connection::open(&db_path)?;
        conn.execute("DELETE FROM tasks WHERE id = ?", [task_id])?;

        Ok(())
    })
    .await
    .map_err(|e| format!("Task panicked: {}", e))?
    .map_err(|e| format!("Database error: {}", e))?;

    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_all_from_tasks, delete_task])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
