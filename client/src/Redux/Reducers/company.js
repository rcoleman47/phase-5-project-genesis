import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  company: undefined,
  users: undefined,
};

export const companySlice = createSlice({
  name: 'company',
  initialState: {value: initialState},
  reducers: {
    mount: (state, action) => {
      state.company = action.payload
    },
    unmount: state => {
      state.company = initialState
    },
    setUsers: (state, action) => {
      state.users = action.payload
    },
    addUser: (state , action)=> {
      state.users = [...state.users, action.payload]
    }
  },
})

// Action creators are generated for each case reducer function
export const { mount, unmount, setUsers, addUser } = companySlice.actions

export default companySlice.reducer