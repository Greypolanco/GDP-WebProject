import * as api from "../remote/WebApi";

export const getTasks = async (userId) => {
    return await api.GetUserTasks(userId); 
};

export const getTask = async (taskid) => {
    return await api.GetTask(taskid)
};

export const updateTask = async (task) => {
    return await api.updateTask(task)
}