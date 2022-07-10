import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allProjects: undefined,
  currentProject: undefined,
  viewProject: true,
  projectId: undefined
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
    removeCurrentProject: (state, action) => {
      state.currentProject = initialState.currentProject
    },
    editProject: (state, action) => {
      state.viewProject = action.payload
    },
    setProjectId: (state, action) => {
      state.projectId = action.payload
    },
    updateBudgetItem: (state, action) => {
      state.currentProject.budget_items = state.currentProject.budget_items.map(item =>{
        if (item.id === action.payload.id) {
          return action.payload
        } else {return item}
      })
    },
    updateProject: (state, action) => {
      state.allProjects = state.allProjects.map( project =>{
        if (project.id === action.payload.id) {
          return action.payload
        } else {return project}
      })
    },
  },
})

// Action creators are generated for each case reducer function
export const { setProjects, setCurrentProject, addProject, removeCurrentProject, editProject, setProjectId, updateBudgetItem, updateProject } = projectsSlice.actions

export default projectsSlice.reducer