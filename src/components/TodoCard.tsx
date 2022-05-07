import { type } from '@testing-library/user-event/dist/type';
import React, { useState, useRef, useEffect } from 'react'
import { Todo } from '../model';
import { AiTwotoneEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { IoMdDoneAll } from 'react-icons/io';
import './styles.css';

type Props = {
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoCard = ({todo, todos, setTodos}: Props) => {

    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    //done todo
    const passDone = (id:number) => {
        setTodos(
            todos.map((todo) => todo.id === id ? { ...todo, isDone: !todo.isDone}: todo
        ))
    };

    //delete todo
    const passDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    //submit edit
    const passEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();

        setTodos(
            todos.map((todo) => (todo.id === id? {...todo, todo:editTodo}: todo)
        ))
        setEdit(false);
    };

    //do focus when clicking edit
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      inputRef.current?.focus();
    }, [edit])
    


  return (
      <form className="todo_card" onSubmit={(e) => passEdit(e, todo.id)}>
          {
              edit ? (
                  <input type="text" className='todo_card--test' value={editTodo} onChange={(e) => setEditTodo(e.target.value)} />
              ):(
                todo.isDone ? (
                    <s className="todo_card--text">{todo.todo}</s>
                  ) : (
                    <span className="todo_card--text">{todo.todo}</span>
                  ))
          }
            <div>
              <span className="icon" onClick={() => {
                  if(!edit && ! todo.isDone){
                      setEdit(!edit);
                  }
              }}><AiTwotoneEdit /></span>
              <span className="icon" onClick={()=> passDelete(todo.id)}><MdDelete /></span>
              <span className="icon" onClick={() => passDone(todo.id)}><IoMdDoneAll /></span>
            </div>
      </form>
  )
}

export default TodoCard;