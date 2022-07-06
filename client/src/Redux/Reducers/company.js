import { createSlice } from '@reduxjs/toolkit'

const initialState = undefined;

export const companySlice = createSlice({
  name: 'company',
  initialState: {value: initialState},
  reducers: {
    mount: (state, action) => {
      state.value = action.payload
    },
    unmount: state => {
      state.value = initialState
    }
  },
})

// Action creators are generated for each case reducer function
export const { mount, unmount } = companySlice.actions

export default companySlice.reducer