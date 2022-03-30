import './App.css'
import TodoList from './components/TodoList'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import TodosContextProvider from './contexts/todosContext'
const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <TodosContextProvider>
        <div className="app">
          <TodoList />
        </div>
      </TodosContextProvider>
    </ApolloProvider>
  )
}

export default App
