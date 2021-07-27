let initialState = {
    status: "idle"
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialAuthType = typeof initialState;
export type AppStatusActionType = LogAppStatusACType;

const appReducer = (state: InitialAuthType = initialState, action: AppStatusActionType): InitialAuthType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return { ...state, status: action.status }

        default:
            return state;
    }

}

//Action creators
type LogAppStatusACType = ReturnType<typeof setAppStatusAC>

export const setAppStatusAC = (status: RequestStatusType) => ({
    type: 'APP/SET-STATUS',
    status
} as const)

export default appReducer;