import { useQuery } from '@apollo/client'
import { useContext } from 'react'
import { TodosContext } from '../../contexts/todosContext'
import { getTodos } from '../../graphql-client/queries'
import Loading from '../Loading'
import Todo from '../Todo'
import TodoForm from '../TodoForm'
import './todoList.css'

const TodoList = () => {
  const { loading, error, data } = useQuery(getTodos)
  const { setValueUpdate } = useContext(TodosContext)

  if (loading)
    return (
      <div className="loading">
        <Loading />
      </div>
    )
  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <TodoForm />
      {error && <h1>Something went wrong</h1>}

      <div className="wrapper">
        {data &&
          data.todos.length > 0 &&
          [...data.todos]
            .sort((a, b) => b.id.toString().localeCompare(a.id.toString()))
            .map(todo => <Todo key={todo.id} {...todo} onTodoClick={() => setValueUpdate(todo)} />)}
      </div>
    </>
  )
}

export default TodoList
