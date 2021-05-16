import { Handler } from 'express';
import { getConnection } from '../db';
import { nanoid} from 'nanoid';

export const getTaks: Handler = (req, res) => {
    const data = getConnection().get('tasks');
    return res.json({
        data
    })
}

export const createTask: Handler = (req, res) => {

    const { name, description} = req.body;

   try {

    const newTaks = {
        name, 
        description,
        id: nanoid()
    }

    getConnection().get('tasks').push(newTaks).write()

    return res.status(200).json({
        data: newTaks
    })
       
   } catch (error) {
    return res.status(500).json({
        message: "Ocurrio un error",
        error
    })
   }
}

export const getTask: Handler = (req, res) => {

    const data = getConnection().get('tasks').find({ id: req.params.id}).value();

    if(!data) return res.status(404).json({ message: "No existe la tarea"})

    return res.status(200).json({
        data
    })
}

export const deleteTask: Handler = (req, res) => {

    const data = getConnection().get('tasks').remove({ id: req.params.id }).write();

    if(data.length == 0) return res.status(404).json({ message: "La tarea no existe en el listado.."})

    return res.status(200).json({
        data
    })
}

export const updateTask: Handler = (req, res) => {

    const task = getConnection().get('tasks').find({ id: req.params.id }).value();

    if(!task) return res.status(404).json({ message: "No existe la tarea en el listado.."})

    const data = getConnection().get('tasks').find({id: req.params.id}).assign(req.body).write();

    return res.status(200).json({
        data
    })
}

export const countTasks: Handler = (req, res) => {
    const tasksLength = getConnection().get('tasks').value().length;
    return res.json({
        data: tasksLength
    })
}