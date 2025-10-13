use tauri_plugin_sql::{Builder, Migration, MigrationKind};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations = vec![
        // Define your migrations here
        Migration {
            version: 2,
            description: "create_initial_tables",
            sql: include_str!("../database/schema.sql"),
            kind: MigrationKind::Up,
        }
    ];

    tauri::Builder::default()
        .plugin(Builder::default()
            .add_migrations("sqlite:data.db", migrations)
            .build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
