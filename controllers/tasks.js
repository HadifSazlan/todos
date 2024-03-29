import Task from '../models/task.js';

export const getTasks = async(req,res) => {
    try {
        const task = await Task.find({})
            res.status(200).json({ task });
    } catch(error) {
            res.status(500).json({ msg: error });
    }
}

/*
async used for operations that take time to complete. Eg. fetching data from server, reading/writing to database, handling user input.
await pauses execution of function until Promise is resolved to return.
*/
export const createTask = async(req, res) => {
    try {
        const task = await Task.create(req.body)
            res.status(201).json({ task });
    } catch(error) {
            res.status(500).json({ msg: error });
    }
}
/*
underscore id "_id" used to refer primary key (MongoDB community practice).
*/
export const getTask = async(req, res) => {
    try {
        const {id:taskID} = req.params;
        const task = await Task.findOne({_id:taskID})
            if (!task){
                return res.status(404).json({msg: `no task with id:${taskID}`});
            }
        res.status(200).json({ task });
    } catch(error) {
        res.status(500).json({ msg: error });
    }
}

//"runValidators" to enable validators set in taskSchema
export const updateTask = async(req, res) => {
    try {
        const {id:taskID} = req.params;
        const task = await Task.findOneAndUpdate({_id:taskID}, req.body, {
            new: true,
            runValidators: true
        })
            if (!task){
                return res.status(404).json({msg: `no task with id:${taskID}`});
            }
        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

export const deleteTask = async(req, res) => {
    try {
        const {id:taskID} = req.params
        const task = await Task.findOneAndDelete({_id:taskID})
            if (!task){
                return res.status(404).json({msg: `no task with id:${taskID}`});
            }
        res.status(200).json({ task });
    } catch(error) {
        res.status(500).json({ msg: error });
    }
}