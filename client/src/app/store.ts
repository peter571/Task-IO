import { configureStore } from '@reduxjs/toolkit'
import messageSlice from '../features/message/messageSlice'
import spaceSlice from '../features/spaces/spaceSlice'
import taskSlice from '../features/tasks/taskSlice'
import userSlice from '../features/users/userSlice'

export const store = configureStore({
  reducer: {
    users: userSlice,
    spaces: spaceSlice,
    tasks: taskSlice,
    messages: messageSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
