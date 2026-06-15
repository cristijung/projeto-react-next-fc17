import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  id: string;
  texto: string;
  concluido: boolean;
}

interface TodoState {
  items: Todo[];
}

const initialState: TodoState = {
  items: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    adicionarTodo: (state, action: PayloadAction<string>) => {
      state.items.push({
        id: crypto.randomUUID(), // gera um ID único no navegador
        texto: action.payload,
        concluido: false,
      });
    },
    alternarTodo: (state, action: PayloadAction<string>) => {
      const todo = state.items.find((item) => item.id === action.payload);
      if (todo) {
        todo.concluido = !todo.concluido;
      }
    },
    removerTodo: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { adicionarTodo, alternarTodo, removerTodo } = todoSlice.actions;
export default todoSlice.reducer;