import { createSlice } from '@reduxjs/toolkit'

const initialState = {};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value = action.payload
    },
    logout: state => {
      state.value = initialState
    }
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions

export default userSlice.reducer