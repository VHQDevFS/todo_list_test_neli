import { gql } from '@apollo/client'

const addNewTodo = gql`
  mutation addNewTodoMutation($description: String, $isFinished: Boolean) {
    createTodo(description: $description, isFinished: $isFinished) {
      id
      description
      isFinished
    }
  }
`

const markSingleFinish = gql`
  mutation markFinishMutation($id: ID!, $isFinished: Boolean) {
    markFinish(id: $id, isFinished: $isFinished) {
      id
      description
      isFinished
    }
  }
`

const editSingleTodo = gql`
  mutation editTodoMutation($id: ID!, $description: String) {
    editTodo(id: $id, description: $description) {
      id
    }
  }
`

const deleteSingleTodo = gql`
  mutation deleteTodoMutation($id: ID!) {
    deleteTodo(id: $id) {
      id
      description
      isFinished
    }
  }
`

export { addNewTodo, markSingleFinish, editSingleTodo, deleteSingleTodo }
