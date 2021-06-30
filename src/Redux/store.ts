import {applyMiddleware, combineReducers, createStore} from "redux";
import newPasswordReducer from "./new-password-reducer";
import thunkMiddleware from "redux-thunk";
import loginReducer from "./login-reducer";
import profileReducer from "./profile-reducer";
import registrationReducer from "./reg-reducer";
import PasswordRecoveryReducer from "./password-recovery-reducer";


export const rootReducer = combineReducers({
    loginPage: loginReducer,
    profile: profileReducer,
    newPassPage: newPasswordReducer,
    recovPass: PasswordRecoveryReducer,
    reg: registrationReducer,
})


export type AppStateType = ReturnType<typeof rootReducer>


export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

//@ts-ignore
window.store = store;
