import React, { createContext, useContext, useState, } from 'react';
import { createTaskRequest, getTasksRequest } from '../api/tasks';

const TaskContext = createContext();

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTasks must be used within a TaskProvider');
    }
    return context;
}

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);

    const getTasks = async () => {
        try {
            const res = await getTasksRequest();
            setTasks(res.data);
        } catch (error) {
            console.error(error);
        }
        // console.log(res); Mostrar tareas
    }

    const createTask = async (task) => {
        console.log("task: ", task)
        const res = await createTaskRequest(task)
        console.log(res);
    }

    /*
        useEffect(() => {
            const fetchTasks = async () => {
                const response = await fetch('/api/tasks');
                const data = await response.json();
                setTasks(data);
            };
            fetchTasks();
        }, []);*/

    return (
        <TaskContext.Provider value={{ /*tasks, setTasks */
            tasks,
            createTask,
            getTasks,
        }}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskContext;