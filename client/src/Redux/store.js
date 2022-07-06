import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Reducers/user';
import registerReducer from './Reducers/register';
import companyReducer from './Reducers/company';
import projectsReducer from './Reducers/projects';
import searchReducer from './Reducers/search';

export const store = configureStore({
  reducer: {
    user: userReducer,
    register: registerReducer,
    company: companyReducer,
    projects: projectsReducer,
    search: searchReducer,
  },
})