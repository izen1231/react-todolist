import { useMemo, useReducer } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import { TodoContext, reducer, initialState } from './store/todo';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <TodoContext.Provider value={useMemo(() => ({ state, dispatch }), [state])}>
      <TodoInput />
      <TodoList />
    </TodoContext.Provider>
  );
}

export default App;
