import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import {
  userReducer,
  settingReducer,
  addressReducer,
  contactUsReducer,
  locationsReducer,
  commonReducer,
  productReducer,
  receiptsReducer,
  warrantyReducer,
  chartReducer,
  notificationReducer,
} from '../reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import warrantybuyReducer from '../reducer/warrantybuyReducer';

const appReducer = combineReducers({
  userReducer,
  settingReducer,
  addressReducer,
  contactUsReducer,
  locationsReducer,
  commonReducer,
  productReducer,
  receiptsReducer,
  warrantyReducer,
  chartReducer,
  notificationReducer,
  warrantybuyReducer,
});
const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === 'LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
};
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});
export const persistor = persistStore(store);
