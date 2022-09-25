import { configureStore } from '@reduxjs/toolkit'
import loginSlice from '../features/login/loginSlice'
import registerSlice from '../features/register/registerSlice'

export const store = configureStore({
  reducer: {
    login: loginSlice,
    register: registerSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
