import { addTodo,removeTodo,markAsDone,selectTodos } from "./todosSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export function Todos() 
{
    const dispatch = useDispatch();
    const todos = useSelector(selectTodos);
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim().length) 
            {

                dispatch(addTodo({id:uuidv4(), text: text, completed: false}));
                setText("");
            }
    };

    return (
        <div>
        <h1>What's on your mind today?</h1>
           <form onSubmit={handleSubmit}>
               <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
           </form>
        <ul>
            {todos.map((todo) => <div>
                <li key={todo.id}>{todo.text}</li>
                <button onClick={() => dispatch(removeTodo(todo.id))}>Remove</button>
                <button onClick={() => dispatch(markAsDone(todo.id))} disabled={todo.completed} >Done</button>
            </div>)}
        </ul>
        </div>);
}