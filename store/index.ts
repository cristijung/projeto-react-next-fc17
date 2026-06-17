// este é p arquivo de store
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import todoReducer from './todoSlice';
import { catApi } from './catApi';
import { catApiDois } from './catApiDois';
import { postApi } from './postApi';


export const store = configureStore({
  reducer: {
    todos: todoReducer,
    [catApi.reducerPath]: catApi.reducer,
    [catApiDois.reducerPath]: catApiDois.reducer,
    [postApi.reducerPath]: postApi.reducer    
  },
 
  // o middleware é necessário para habilitar o cache e outras funcionalidades do RTK Query

 middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      catApi.middleware, 
      catApiDois.middleware,
      postApi.middleware
    ),
});

// tipagens essenciais do Redux com Ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// hooks personalizados para evitar ter que tipar em todo arquivo sempre
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;