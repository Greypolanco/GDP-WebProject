import { Login } from "../remote/WebApi";

export const login = async (credential) => {
    return await Login(credential);
}