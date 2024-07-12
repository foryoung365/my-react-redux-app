import { addTodo, removeTodo, markAsDone, selectTodos } from "./todosSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import './Todos.css'; // 引入样式文件

export default function Todos() {
    const dispatch = useDispatch();
    const todos = useSelector(selectTodos);
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim().length) {
            dispatch(addTodo({ id: uuidv4(), text: text, completed: false }));
            setText("");
        }
    };

    return (
        <div className="todos-container">
            <h1>What's on your mind today?</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="todo-input"
                />
            </form>
            <ul className="todo-list">
                {todos.map((todo) => (
                    <li key={todo.id} className="todo-item">
                        <span className="todo-text">{todo.text}</span>
                        <button
                            onClick={() => dispatch(markAsDone(todo.id))}
                            disabled={todo.completed}
                            className="todo-button done-button"
                        >
                            ✓
                        </button>
                        <button
                            onClick={() => dispatch(removeTodo(todo.id))}
                            className="todo-button remove-button"
                        >
                            ✗
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
