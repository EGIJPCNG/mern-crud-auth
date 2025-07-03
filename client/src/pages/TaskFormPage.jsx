import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";


function TaskFormPage() {

    const { register, handleSubmit } = useForm();
    const {createTask}= useTasks()

    const onSubmit = handleSubmit((data) => {
        createTask(data);
    });

    return (
        <div className="bg-zinc-800 w-full text-white p-4 rounded-md shadow-md max-w-md mx-auto mt-10">

            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Task Title"
                    {...register("title")}
                    autoFocus
                    className = "w-full bg-zinc-700 text-white mx-3 my-2 px-4 py-2 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <textarea rows="3" placeholder="Task Description"
                    {...register("description")}
                    className = "w-full bg-zinc-700 text-white mx-3 my-2 px-4 py-2 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
                <button type="submit"
                    className = "bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 mx-3 my-2"
                >Create Task</button>
            </form>

        </div>
    )

}

export default TaskFormPage