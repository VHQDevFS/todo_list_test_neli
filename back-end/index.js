const { ApolloServer, gql } = require('apollo-server')
const resolvers = require('./resolver')
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type Todo {
    id: Int
    description: String
    isFinished: Boolean
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each.

  # ROOT TYPE
  type Query {
    todos: [Todo]
    todo(id: ID!): Todo
  }

  type Mutation {
    createTodo(description: String, isFinished: Boolean): Todo

    markFinish(id: ID!, isFinished: Boolean): Todo

    editTodo(id: ID!, description: String): Todo
    
    deleteTodo(id: ID!): Todo
  }
`

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers })

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
