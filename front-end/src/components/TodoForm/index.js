import { useMutation } from '@apollo/client'
import { useContext, useEffect, useRef, useState } from 'react'
import { TodosContext } from '../../contexts/todosContext'
import { addNewTodo, editSingleTodo } from '../../graphql-client/mutations'
import { getTodos } from '../../graphql-client/queries'
import './todoForm.css'

const TodoForm = () => {
  const { isEditMode, setIsEditMode, valueUpdate, setValueUpdate } = useContext(TodosContext)
  const [input, setInput] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  })

  useEffect(() => {
    if (valueUpdate?.description) setInput(valueUpdate.description)
  }, [valueUpdate?.description])

  useEffect(() => {
    if (!isEditMode) setInput('')
  }, [isEditMode])

  const handleChange = e => {
    setInput(e.target.value)
  }
  const handleSubmit = e => {
    e.preventDefault()
    if (input === '') return

    if (isEditMode) {
      editTodo({
        variables: {
          id: valueUpdate.id,
          description: input
        },
        refetchQueries: [{ query: getTodos }]
      })
      setIsEditMode(false)
      setInput('')
      setValueUpdate(null)
      return
    }

    addTodo({
      variables: {
        description: input,
        isFinished: false
      },
      refetchQueries: [{ query: getTodos }]
    })

    setInput('')
  }

  const [addTodo, dataAddTodoMutation] = useMutation(addNewTodo)
  const [editTodo, dataEditTodoMutation] = useMutation(editSingleTodo)
  console.log("dataEditTodoMutation: ", dataEditTodoMutation);
  return (
    <form onSubmit={handleSubmit} className="todo-form">
      {isEditMode ? (
        <>
          <input
            placeholder="Update your todo"
            value={input}
            onChange={handleChange}
            name="text"
            ref={inputRef}
            className="todo-input edit"
          />
          <button onClick={handleSubmit} className="todo-button edit">
            Update
          </button>
          {/* <button onClick={handleSubmit} className="todo-button">
            Cancel
          </button> */}
        </>
      ) : (
        <>
          <input
            placeholder="Add a todo"
            value={input}
            onChange={handleChange}
            name="text"
            className="todo-input"
            ref={inputRef}
          />
          <button onClick={handleSubmit} className="todo-button">
            Add todo
          </button>
        </>
      )}
    </form>
  )
}

export default TodoForm
