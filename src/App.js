import React, { useState, useRef, useEffect } from 'react'
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

// use state returns a array
function App() {
  const [todos, setTodos] = useState([]) // object destructuring (meaning Js experssion which allows us to extract data from arrays, object and maps and set them to new different variables)
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const toggleTodo = (id) => {
    const newTodos = [...todos] // make a copy existing Todo(array)
    // Perform operations on newTodos
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
    todoNameRef.current.value = null
  }

  return (
    // <TodoList/>
    // <input type="text"/> // -> this throws a error as we are trying to return two component using single return and function can return only one function component
    // instead use fragements

    <>
      <TodoList todo={todos} /> {/*  todo={todos} -> this is knows as props */}
      <input type="text" ref={todoNameRef} />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button>Clear Completed Todos</button>
      <div>0 left</div>
    </>
  )
}

export default App
