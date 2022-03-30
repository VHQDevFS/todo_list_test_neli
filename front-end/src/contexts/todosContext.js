import { createContext, useState } from 'react'

export const TodosContext = createContext()

const TodosContextProvider = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [valueUpdate, setValueUpdate] = useState(null)

  const todosContextData = { isEditMode, setIsEditMode, valueUpdate, setValueUpdate }

  return <TodosContext.Provider value={todosContextData}>{children}</TodosContext.Provider>
}

export default TodosContextProvider
