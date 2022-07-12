import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  projectView: '/project/estimate',
  directoryView: '/directory/company',
};

export const viewSlice = createSlice({
  name: 'view',
  initialState: {value: initialState},
  reducers: {
    setProjectView: (state, action) => {
      state.projectView = action.payload
    },
    setDirectoryView: (state, action) => {
      state.directoryView = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setProjectView, setDirectoryView } = viewSlice.actions

export default viewSlice.reducer