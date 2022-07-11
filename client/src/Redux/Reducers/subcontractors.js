import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allSubs: undefined
}

export const subcontractorSlice = createSlice({
  name: 'subs',
  initialState: {value: initialState},
  reducers: {
    setSubs: (state, action) => {
      state.allSubs = action.payload
    },
    addSub: (state, action) => {
      state.allSubs = [state.allSubs, action.payload]
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSubs, addSub } = subcontractorSlice.actions

export default subcontractorSlice.reducer