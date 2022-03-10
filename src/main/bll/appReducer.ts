import {Dispatch} from "redux";
import {AppThunkType} from "./store";
import {cardsAPI} from "../../API/api";
import {setIsLoggedInAC} from "./loginReducer";

const initialState = {
  isInitialized: false,
  errorAPP: '',
  error: '',
  isLoading: false,
}

export const appReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
  switch (action.type) {
    case 'APP/SET_LOADING':
      return {...state, isLoading: action.value}
    case 'APP/SET_ERROR_APP':
      return {...state, errorAPP: action.errorAPP}
    case 'APP/SET_ERROR':
      return {...state, error: action.error}
    case 'APP/SET_INITIALIZED':
      return {...state, isInitialized: action.isInitialized}
    default:
      return state
  }
};

// type
type InitialStateType = {
  isInitialized: boolean
  errorAPP: string
  error: string
  isLoading: boolean
}

export type AuthActionsType = setIsInitializedType | setErrorType | setIsLoggedInACType | setErrorAPPType

type setIsLoggedInACType = ReturnType<typeof setLoadingAC>

export const setLoadingAC = (value: boolean) =>
  ({type: 'APP/SET_LOADING', value} as const)
// actions
export const setIsInitializedAC  = (isInitialized: boolean) => ({type: 'APP/SET_INITIALIZED',isInitialized} as const)

type setIsInitializedType = ReturnType<typeof setIsInitializedAC>

export const setErrorAC = (error: string) =>
  ({type: 'APP/SET_ERROR', error} as const)

type setErrorType = ReturnType<typeof setErrorAC>


export const setErrorAPPAC = (errorAPP: string) =>
    ({type: 'APP/SET_ERROR_APP', errorAPP} as const)

type setErrorAPPType = ReturnType<typeof setErrorAPPAC>

// thunk
export const initializeAppTC = (): AppThunkType => {
  return (dispatch: Dispatch) => {
    cardsAPI.me()
      .then((res) => {
        if (res.status === 200) {
          dispatch(setIsLoggedInAC(true));
        }
      })
      .catch(e => {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
        dispatch(setErrorAPPAC(error))
      })
      .finally(() => {
        dispatch(setIsInitializedAC(true));
      })
  }
};