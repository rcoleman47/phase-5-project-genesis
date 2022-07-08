import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  all: undefined,
  currentDiv: undefined,
  currentCodes: undefined,
};

export const costCodeSlice = createSlice({
  name: 'costCodes',
  initialState: {value: initialState},
  reducers: {
    getCodes: (state, action) => {
      state.all = action.payload
    },
    setCurrentDiv: (state, action) =>{
      state.currentDiv = action.payload
    },
    setCurrentCodes: (state, action) =>{
      state.currentCode = action.payload
    }

  },
})

// Action creators are generated for each case reducer function
export const { getCodes, setCurrentCodes, setCurrentDiv } = costCodeSlice.actions

export default costCodeSlice.reducer