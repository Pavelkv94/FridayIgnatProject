import axios from "axios";

//api

export const authApi = {

    login(email: string, password: string, rememberMe: boolean) {
        const promise = axios.post<ResponseLoginType>("http://localhost:7542/2.0/auth/login", { email, password, rememberMe })
        return promise
    },

    logout() {
        const promise = axios.delete<{}>("http://localhost:7542/2.0/auth/me")
        return promise
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




// export type ParamsRegisterType = {
//     email: string,
//     password: string
// }

// export type ResponseRegisterType = {
//     addedUser: any,
//     error?: string
// }

