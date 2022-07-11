import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allSubs: undefined,
  currentSub: undefined,
}

export const subcontractorSlice = createSlice({
  name: 'subs',
  initialState: {value: initialState},
  reducers: {
    setSubs: (state, action) => {
      state.allSubs = action.payload
    },
    setCurrentSub: (state, action) => {
      state.currentSub = action.payload
    },
    addSub: (state, action) => {
      state.allSubs = [...state.allSubs, action.payload]
    },
    updateSub: (state, action) => {
      state.allSubs = state.allSubs.map( sub => {
        if (sub.id === action.payload.id) {
          return action.payload
        } else {return sub}
      })
    },
    addContact: (state, action) => {
      state.currentSub.contacts = [...state.currentSub.contacts, action.payload]
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSubs, addSub, setCurrentSub, addContact, updateSub } = subcontractorSlice.actions

export default subcontractorSlice.reducer