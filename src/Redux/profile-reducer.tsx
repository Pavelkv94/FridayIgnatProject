import { ResponseLoginType } from '../api/fridayProject-api';


export const FakeUser = {
    _id: "0",
    email: "fake",
    name: "fake",
    // avatar?: string;
    publicCardPacksCount: 0,

    created: new Date(),
    updated: new Date(),
    isAdmin: false,
    verified: false,
    rememberMe: false
};

export type ProfileStateType = typeof ProfileInitState


export const ProfileInitState = {
    userData: {} as ResponseLoginType,
    isAuth: "" as string,
    status: "idle",
    error: "" as string | null,
};


//export type ProfileActionsType = ReturnType<typeof getUserAC>

const profileReducer = (state = ProfileInitState, action: any) => {

    switch (action.type) {

        default: return state
    }
}

// const getUserAC = (user: ResponseLoginType) => ({
//     type: "profile/SET_USER",
//     user,
// } as const)

// // const updateUserAC = (name: string, avatar: string) => ({
// //     type: "profile/SET_USER",
// //     name, avatar
// // } as const)


// export const getUserTC = () => (dispatch: Dispatch<any>) => {
//     dispatch(setAppStatusAC("loading"))
//     authApi.me()
//         .then(res => {
//             console.log(res)
//             dispatch(getUserAC(res.data));
//             //dispatch(isLoggedInAC(res.data._id))
//             dispatch(setAppStatusAC("succeeded"))
//         })
//         .catch(err => {
//             const error = err.response
//             dispatch(setErrorAC(error
//                 ? err.response.data.error
//                 : (err.message + ', more details in the console')))
//             dispatch(setAppStatusAC("failed"))
//         })
//         .finally(() => {
//             dispatch(setAppStatusAC("idle"))
//         })

// };

// export const updateUser = (name: string, avatar: string) => (dispatch: Dispatch<any>) => {
//     {
//         dispatch(setAppStatusAC("loading"))

//         authApi.updateUser(name, avatar)
//             .then(res => {
//                 dispatch(getUserAC(res.data));
//                 //dispatch(isLoggedInAC(res.data._id))
//                 dispatch(setAppStatusAC("succeeded"))
//             })
//             .catch(err => {
//                 const error = err.response
//                 dispatch(setErrorAC(error
//                     ? err.response.data.error
//                     : (err.message + ', more details in the console')))
//                 dispatch(setAppStatusAC("failed"))
//             })
//             .finally(() => {
//                 dispatch(setAppStatusAC("idle"))
//             })

//     }
// };

export default profileReducer;

