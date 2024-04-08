import { GetUserTasks, GetTask, UpdateTask} from "../remote/WebApi";

export const getTasks = async (userId) => {
    return await GetUserTasks(userId); 
};

export const getTask = async (taskid) => {
    return await GetTask(taskid)
};

export const updateTask = async (task) => {
    return await UpdateTask(task)
}