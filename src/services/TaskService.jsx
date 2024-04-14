import { GetUserTasks, GetTask, UpdateTask, PostTask} from "../remote/WebApi";

export const getTasks = async (userId) => {
    return await GetUserTasks(userId); 
};

export const getTask = async (taskid) => {
    return await GetTask(taskid)
};

export const updateTask = async (task) => {
    return await UpdateTask(task)
}

export const postTask = async (task) => {
    return await PostTask(task)
}