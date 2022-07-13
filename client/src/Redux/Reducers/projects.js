import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allProjects: undefined,
  currentProject: undefined,
  viewProject: true,
  projectId: undefined,
  currentProjectUser: undefined,
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
    removeCurrentProject: (state) => {
      state.currentProject = initialState.currentProject
    },
    editProject: (state, action) => {
      state.viewProject = action.payload
    },
    setProjectId: (state, action) => {
      state.projectId = action.payload
    },
    setUser: (state, action) => {
      state.currentProjectUser = action.payload
    },
    addProjectBid: (state, action) => {
      state.currentProject.bids = [...state.currentProject.bids, action.payload];
    },
    addTeamMember: (state, action) => {
      state.currentProject.users = [...state.currentProject.users, action.payload];
    },
    deleteBudgetItem: (state, action) => {
      state.currentProject.budget_items = state.currentProject.budget_items.filter(item => item.id !== action.payload.id)
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
export const { setProjects, deleteBudgetItem, addTeamMember, setUser, addProjectBid, setCurrentProject, addProject, removeCurrentProject, editProject, setProjectId, updateBudgetItem, updateProject } = projectsSlice.actions

export default projectsSlice.reducer