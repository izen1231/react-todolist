import { useContext, useMemo } from 'react';
import { TodoContext } from '../store/todo';

const TodoList = () => {
  const { state, dispatch } = useContext(TodoContext);

  const todoList = useMemo(() => {
    return state.todoList;
  }, [state.todoList]);

  return (
    <div>
      {todoList.map((todo) => (
        <div key={todo.id}>
          <span>
            {todo.text} {todo.done ? 'O' : 'X'}
          </span>
          <button
            onClick={() =>
              dispatch({ type: 'SELECT', payload: { id: todo.id } })
            }
          >
            수정
          </button>
          <button
            onClick={() =>
              dispatch({ type: 'DELETE', payload: { id: todo.id } })
            }
          >
            삭제
          </button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
