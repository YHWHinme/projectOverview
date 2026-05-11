CREATE TABLE users (
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
	name TEXT NOT NULL
);

CREATE TABLE projects (
	id INTEGER PRIMARY KEY AUTO_INCREMENT, -- TODO: {AI} Set this to use the builtin UUID method to generate a UUID 
	projectName TEXT NOT NULL,
	userId INTEGER NOT NULL,
	CONSTRAINT fk_user_id 
		FOREIGN KEY (userId)
		REFERENCES users(id)
);

CREATE TABLE tasks (
	taskId INTEGER PRIMARY KEY AUTO_INCREMENT,
	taskName TEXT NOT NULL,
	-- TODO: {USER} Add date the task was created 
	-- Also add expected value for when the task's due date is
	taskDue DATE DEFAULT NULL,
	projectId INTEGER NOT NULL,

	CONSTRAINT fk_task_id 
		FOREIGN KEY (projectId)
		REFERENCES projects(id)
)
