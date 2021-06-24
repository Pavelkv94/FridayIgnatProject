import {applyMiddleware, combineReducers, createStore} from "redux";
import passwordReducer from "./password-reducer";
import thunkMiddleware from "redux-thunk";
import loginReducer from "./login-reducer";
import profileReducer from "./profile-reducer";
import registrationReducer from "./reg-reducer";


export const rootReducer = combineReducers({
    loginPage: loginReducer,
    profile: profileReducer,
    passPage: passwordReducer,
    reg: registrationReducer,
})


export type AppStateType = ReturnType<typeof rootReducer>


export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

