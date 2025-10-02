<script lang="ts">
    import { invoke } from "@tauri-apps/api/core";

    interface TasksOutput {
        id: string,
        title: number,
        project_id: string, 
    }

    async function getAllTasks(){
        let tasks = await invoke<string[]>("list tasks", {})
        return tasks
    }
</script>

<h1>Hello from project</h1>
<br>
<h1>{getAllTasks()}</h1>

