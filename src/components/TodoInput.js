import { useCallback, useContext, useEffect, useState } from 'react';
import { TodoContext } from '../store/todo';

const TodoInput = () => {
  const { state, dispatch } = useContext(TodoContext);
  const [todo, setTodo] = useState({ text: '', done: false });
  const { selectedTodoId, todoList } = state;

  useEffect(() => {
    if (selectedTodoId) {
      const selectedTodo = todoList.find((todo) => todo.id === selectedTodoId);
      setTodo({ ...selectedTodo });
    }
  }, [todoList, selectedTodoId]);

  const textChangeHandler = useCallback(
    (e) => {
      setTodo((todo) => ({ ...todo, text: e.target.value }));
    },
    [setTodo]
  );

  const doneChangeHandler = useCallback(
    (e) => {
      setTodo((todo) => ({ ...todo, done: e.target.checked }));
    },
    [setTodo]
  );

  const onAddClickHandler = useCallback(() => {
    dispatch({ type: 'ADD', payload: todo });
  }, [todo, dispatch]);

  const onUpdateClickHandler = useCallback(() => {
    dispatch({ type: 'UPDATE', payload: todo });
    dispatch({ type: 'SELECT', payload: { id: null } });
  }, [todo, dispatch]);

  const onUpdateCancelClickHandler = useCallback(() => {
    setTodo({ text: '', done: false });
    dispatch({ type: 'SELECT', payload: { id: null } });
  }, [dispatch]);

  return (
    <div>
      <input value={todo.text} onChange={textChangeHandler} />
      <input type='checkbox' value={todo.done} onChange={doneChangeHandler} />
      {selectedTodoId ? (
        <>
          <button onClick={onUpdateClickHandler}>수정</button>
          <button onClick={onUpdateCancelClickHandler}>취소</button>
        </>
      ) : (
        <button onClick={onAddClickHandler}>추가</button>
      )}
    </div>
  );
};

export default TodoInput;
