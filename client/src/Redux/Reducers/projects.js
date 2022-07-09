import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allProjects: undefined,
  currentProject: undefined,
  viewProject: true,
  projectId: undefined,
};

export const projectsSlice = createSlice({
  name: 'projects',
  initialState: {value: initialState},
  reducers: {
    setProjects: (state, action) => {
      state.allProjects = action.payload},
    setCurrentProject: (state, action) => {
      state.currentProject = action.payload
    },
    addProject: (state, action) => {
      state.allProjects = [...state.allProjects, action.payload];
    },
    addCurrentProjectItem: (state, action) => {
      state.currentProject.budget_items = [...state.currentProject.budget_items, action.payload];
    },
    removeCurrentProject: (state, action) => {
      state.currentProject = initialState.currentProject
    },
    editProject: state => {
      state.viewProject = !state.viewProject
    },
    setProjectId: (state, action) => {
      state.projectId = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setProjects, setCurrentProject, addProject, addCurrentProjectItem, removeCurrentProject, editProject, setProjectId } = projectsSlice.actions

export default projectsSlice.reducer