import { useMutation } from '@apollo/client'
import { useContext } from 'react'
import deleteIcon from '../../assets/icons/deleteIcon.svg'
import editIcon from '../../assets/icons/editIcon.svg'
import { TodosContext } from '../../contexts/todosContext'
import { deleteSingleTodo, markSingleFinish } from '../../graphql-client/mutations'
import { getTodos } from '../../graphql-client/queries'
import './todo.css'

const Todo = ({ id, description, isFinished, onTodoClick }) => {
  const { setIsEditMode, setValueUpdate } = useContext(TodosContext)
  const handleEditMode = e => {
    e.stopPropagation()

    if (!isFinished) {
      setIsEditMode(true)
      onTodoClick()
    }
  }

  const markFinishTodo = id => {
    if (!id) return
    markFinish({
      variables: {
        id,
        isFinished: !isFinished
      },
      refetchQueries: [
        {
          query: getTodos
        }
      ]
    })
    setIsEditMode(false)
    setValueUpdate(null)
  }

  const handleDeleteTodo = (e, id) => {
    e.stopPropagation()

    if (!id) return

    deleteTodo({
      variables: {
        id
      },
      refetchQueries: [
        {
          query: getTodos
        }
      ]
    })

    setIsEditMode(false)
  }

  const [deleteTodo] = useMutation(deleteSingleTodo)
  const [markFinish] = useMutation(markSingleFinish)

  return (
    <div className={`todo-row ${isFinished ? 'finished' : ''}`} onClick={() => markFinishTodo(id)}>
      <p>{description}</p>
      <div className="icons">
        <img src={editIcon} alt="" width={20} heigh={20} onClick={handleEditMode} />
        <img src={deleteIcon} alt="" width={20} heigh={20} onClick={e => handleDeleteTodo(e, id)} />
      </div>
    </div>
  )
}

export default Todo
