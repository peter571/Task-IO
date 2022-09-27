import { configureStore } from '@reduxjs/toolkit'
import spaceSlice from '../features/spaces/spaceSlice'
import taskSlice from '../features/tasks/taskSlice'
import userSlice from '../features/users/userSlice'

export const store = configureStore({
  reducer: {
    users: userSlice,
    spaces: spaceSlice,
    tasks: taskSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch