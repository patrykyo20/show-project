import { configureStore } from '@reduxjs/toolkit';
import projectApi from './slices/projects/projectsApi';
import messageApi from './slices/projects/messagesApi';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [projectApi.reducerPath]: projectApi.reducer,
      [messageApi.reducerPath]: messageApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(projectApi.middleware, messageApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
