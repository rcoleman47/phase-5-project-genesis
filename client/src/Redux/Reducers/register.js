import { createSlice } from '@reduxjs/toolkit'

const initialState = false;

export const registerSlice = createSlice({
  name: 'register',
  initialState: {value: initialState},
  reducers: {
    created: state => {
      state.value = true;
    },
    finished: state => {
      state.value = initialState
    }
  },
})

// Action creators are generated for each case reducer function
export const { created, finished } = registerSlice.actions

export default registerSlice.reducer