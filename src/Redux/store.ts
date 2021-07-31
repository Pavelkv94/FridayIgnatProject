import { applyMiddleware, combineReducers, createStore } from "redux";
import newPasswordReducer from "./new-password-reducer";
import thunkMiddleware from "redux-thunk";
import loginReducer from "./login-reducer";
import profileReducer from "./profile-reducer";
import registrationReducer from "./reg-reducer";
import passwordRecoveryReducer from "./password-recovery-reducer";
import packsReducer from "./packs-reducer";
import cardsReducer from "./cards-reducer";
import appReducer from "./app-reducer";


export const rootReducer = combineReducers({
    app: appReducer,
    loginPage: loginReducer,
    profile: profileReducer,
    newPassPage: newPasswordReducer,
    recovPass: passwordRecoveryReducer,
    reg: registrationReducer,
    packs: packsReducer,
    cards: cardsReducer,
})


export type AppStateType = ReturnType<typeof rootReducer>


export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

//@ts-ignore
window.store = store;
