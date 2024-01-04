import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface IInitialState {
  isAuthicated : boolean,
  userId: number | null,
  userName: string
}

const initialState = { 
  isAuthicated: false,
  userId: null,
  userName: ''
} as IInitialState

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setInitialUserState: (state)=>{
      state.isAuthicated = false
      state.userId = null
      state.userName = ''
    },
    setUserState: (state, action:PayloadAction<IInitialState>)=>{
      Object.assign(state, action.payload)
    }
  },
})

export const { setInitialUserState, setUserState } = userSlice.actions
export default userSlice.reducer