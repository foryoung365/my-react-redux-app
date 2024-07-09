import { createSlice } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        addTodo: (state, action) => {
            state.push(action.payload);
            return state;
        },
        removeTodo: (state, action) => {
            return state.filter((todo) => todo.id !== action.payload);
        },
        markAsDone: (state, action) => {
            state.forEach((todo) => {
                if (todo.id === action.payload) {
                    todo.completed = true;
                }
                return state;
            });
        }
    }

});

export const selectTodos = (state) => state.todos;
export const { addTodo, removeTodo, markAsDone } = todosSlice.actions;

export default todosSlice.reducer;