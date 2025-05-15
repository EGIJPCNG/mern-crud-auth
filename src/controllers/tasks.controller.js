import Task from "../models/tasks.model.js";

export const getTasks = async (req, res) => {
    const tasks = await Task.find({user: req.user.id}).populate('user'); 
    // {user: req.user.id} buscar solo información de las tareas 
    // del usuario autenticado
    res.json(tasks)
};
export const createTask = async (req, res) => {
    const { title, description, date } = req.body;

    console.log(req.user)

    const newTask = new Task({
        title,
        description,
        date,
        user: req.user.id // "user: req.user.id" se requiere el id del usuario 
        // autenticado para poder crear la tarea
    });

    const savedTask = await newTask.save()
    res.json(savedTask);
};
export const getTask = async (req, res) => {
    const task = await Task.findById(req.params.id).populate('user'); // .populate('user') para obtener la información del usuario
    if (!task) return res.status(404).json({ message: "Task not found" })
    res.json(task);
};
export const updateTasks = async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    if (!task) return res.status(404).json({ message: "Task not found" })
    res.json(task);
};

export const deleteTasks = async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id)
    if (!task) return res.status(404).json({ message: "Task not found" })
    res.status(204).json();
};