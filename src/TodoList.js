import React from 'react'
import Todo from './Todo'

export default function TodoList({todo}) {
    return(
       todo.map(todo => {
        return <Todo key={todo.id} todo={todo}/>
       })
    )
}