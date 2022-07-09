import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  all: undefined,
  currentDiv: undefined,
  currentDivCodes: undefined,
  currentCode: undefined,
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
    setCurrentDivCodes: (state, action) =>{
      state.currentDivCodes = action.payload
    },
    setCurrentCode: (state, action) =>{
      state.currentCode = action.payload
    }

  },
})

// Action creators are generated for each case reducer function
export const { getCodes, setCurrentDivCodes, setCurrentDiv, setCurrentCode } = costCodeSlice.actions

export default costCodeSlice.reducer