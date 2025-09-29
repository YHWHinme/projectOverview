use rusqlite::{Connection, Result};

    
fn main() -> Result<()> {
    let  conn = Connection::open_in_memory()?;

    conn.execute("CREATE TABLE person(id INTEGER  PRIMARY KEY, name TEXT NOT NULL)", ())
}
