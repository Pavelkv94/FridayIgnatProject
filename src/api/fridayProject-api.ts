import axios from "axios";

//api

export const authApi = {
    me() {
        return axios.post<ResponseLoginType>("http://localhost:7542/2.0/auth/me", {})
    },
    login(email: string, password: string, rememberMe: boolean) {
        return axios.post<ResponseLoginType>("http://localhost:7542/2.0/auth/login", { email, password, rememberMe })
    },

    logout() {
        return axios.delete("http://localhost:7542/2.0/auth/me")
    }

}

//types

export type ResponseLoginType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string;
}

