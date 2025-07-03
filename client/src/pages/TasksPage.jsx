import { useEffect } from "react";
import { useTasks } from "../context/TasksContext";

function TasksPage() {

    const { getTasks, tasks } = useTasks()
    console.log(getTasks);

    useEffect(() => {
        getTasks();
    }, [])

    if (tasks.length == 0) return <p>No tasks found</p>;

    return <div
    className="max-w-md"
    > {

        tasks.map(task => (
            <div key={task._id}
                className="bg-zinc-800 w-md p-4 rounded-lg"
            >
                <h1>{task.title}</h1>
                <p>{task.description}</p>
            </div>
        ))

    }
    </div>


}

export default TasksPage