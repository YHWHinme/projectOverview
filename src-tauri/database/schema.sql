CREATE TABLE clients(id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT NOT NULL,
	description TEXT,
	projectNumber INTEGER 
);

CREATE TABLE projects(id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT NOT NULL,
	description TEXT,
	client_id INTEGER,
	dueDate INTEGER,
	CONSTRAINT fk_client_id FOREIGN KEY(client_id) REFERENCES clients(id)
);

CREATE TABLE tasks(
id INTEGER PRIMARY KEY AUTOINCREMENT,
title TEXT NOT NULL,
description TEXT,
complete BOOLEAN DEFAULT 0,
project_id INTEGER NOT NULL,
parent_id INTEGER,
CONSTRAINT fk_project_id FOREIGN KEY (project_id) REFERENCES projects(id)
);

