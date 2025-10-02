use rusqlite::Connections;

#[derive(serde::Serialize)]
struct TasksOutput {
  id: i32,
  project_id: i32,
  title: String,
};

//Get everything from tasks
#[tauri::command]
fn getFromTasks() {
    let conn = Connections::open("../database/database.sql").unwrap();

    let mut prep = conn.prepare("SELECT * FROM tasks").unwrap();
    // Mapping into struct
    let rows =  prep
        .query_map([], |row| {
            Ok(TasksOutput {
                id: row.get(0)?,
                title: row.get(1)?,
                project_id: row.get(2)?,
            })
        });
    //Collecting the rows into a vector (json)
    let tasks: Vec<TasksOutput> = rows.map(|row| row.unwrap().collect());

    tasks
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![hello, getFromTasks])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
