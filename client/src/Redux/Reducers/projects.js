import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allProjects: undefined,
  currentProject: undefined,
};

export const projectsSlice = createSlice({
  name: 'projects',
  initialState: {value: initialState},
  reducers: {
    setProjects: (state, action) => {
      state.allProjects = action.payload},
    setCurrentProject: (state, action) => {
      state.currentProject = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setProjects, setCurrentProject } = projectsSlice.actions

export default projectsSlice.reducer