import { createContext } from 'react';

export const TodoContext = createContext();

let id = 2;
export const initialState = {
  todoList: [{ id: 1, text: '할일 1', done: false }],
  selectedTodoId: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        todoList: [...state.todoList, { ...action.payload, id: id++ }],
      };
    case 'UPDATE':
      return {
        todoList: state.todoList.map((todo) => {
          if (todo.id === state.selectedTodoId) {
            return {
              ...action.payload,
              id: todo.id,
            };
          }
          return todo;
        }),
      };
    case 'DELETE':
      return {
        ...state,
        todoList: state.todoList.filter(
          (todo) => todo.id !== action.payload.id
        ),
      };
    case 'SELECT':
      return {
        ...state,
        selectedTodoId: action.payload.id,
      };
    default:
      break;
  }
};
