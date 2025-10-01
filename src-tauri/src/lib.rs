use rusqlite::Connections;

#[tauri::command]
fn hello() -> String {
    "Hello from Rust!".to_string()
}

//Get everything from tasks
#[tauri::command]
fn getFromTasks(){
    let conn = Connections::open("../database/database.sql");
}


#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![hello, getFromTasks])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
