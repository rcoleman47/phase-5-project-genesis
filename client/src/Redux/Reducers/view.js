import { createSlice } from '@reduxjs/toolkit'

const initialState = '/project/estimate';

export const viewSlice = createSlice({
  name: 'view',
  initialState: {value: initialState},
  reducers: {
    setView: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setView } = viewSlice.actions

export default viewSlice.reducer