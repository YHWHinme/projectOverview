use tauri_plugin_sql::{Builder, Migration, MigrationKind};

fn main(){
    //Defining Migration struct for sqlite usage in frontend
    let migration = vec![
    Migration {
        version: 1,
        description: "create_initial_tables",
        sql: include_str!("../database/database.sql"),
        kind: MigrationKind::Up,
    };
    ]

}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(Builder::default()
            .add_migrations("sqlite:mydatabase.db", migrations)
            .build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
