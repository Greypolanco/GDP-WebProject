import { Login, Register } from "../remote/WebApi";

export const login = async (credential) => {
    return await Login(credential);
}

export const register = async (user) => {
    return await Register(user);
}