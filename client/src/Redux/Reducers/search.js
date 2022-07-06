import { createSlice } from '@reduxjs/toolkit'

const initialState = '';

export const searchSlice = createSlice({
  name: 'search',
  initialState: {value: initialState},
  reducers: {
    setSearch: (state, action) => {
      state.value = action.payload
    },
    endSearch: (state, action) => {
      state.value = initialState
    }
  },
})

// Action creators are generated for each case reducer function
export const { setSearch, endSearch } = searchSlice.actions

export default searchSlice.reducer