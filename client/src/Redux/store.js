import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './Reducers/user';
import registerReducer from './Reducers/register';
import companyReducer from './Reducers/company';
import projectsReducer from './Reducers/projects';
import searchReducer from './Reducers/search';
import storage from 'redux-persist/lib/storage';
import costCodesReducer from './Reducers/costcodes';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import subcontractorReducer from './Reducers/subcontractors';
import viewReducer from './Reducers/view';


const rootReducer = combineReducers({
  user: userReducer,
  register: registerReducer,
  company: companyReducer,
  projects: projectsReducer,
  search: searchReducer,
  costCodes: costCodesReducer,
  subs: subcontractorReducer,
  view: viewReducer,
});

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
});

export const persistor = persistStore(store)