const { getDB } = require('../mysql')

const resolvers = {
  //QUERY
  Query: {
    todos: async () => {
      const db = await getDB()
      const getQuery = `SELECT * FROM todo`
      return new Promise((resolve, reject) => {
        db.query(getQuery, (err, todos, fields) => {
          if (err) {
            reject(err)
          } else {
            resolve(todos)
          }
        })
      })
    },

    todo: async (parent, { id }) => {
      const db = await getDB()
      return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM todo WHERE id= ?`, id, (err, data) => {
          if (err) {
            reject(err)
          } else {
            resolve(data[0])
          }
        })
      })
    }
  },

  //MUTATION
  Mutation: {
    createTodo: async (parent, args) => {
      const { description, isFinished } = args
      const db = await getDB()

      const createQuery = `INSERT INTO todo(description, isFinished) VALUES (?,?)`
      return new Promise((resolve, reject) => {
        db.query(createQuery, [description, isFinished], (err, result) => {
          console.log('result: ', result)
          if (err) {
            reject(err)
          } else {
            resolve(result)
          }
        })
      })
    },

    markFinish: async (parent, args) => {
      const { id, isFinished } = args
      const db = await getDB()

      const markQuery = `
        UPDATE todo SET isFinished = ? WHERE id = ?
      `

      return new Promise((resolve, reject) => {
        db.query(markQuery, [isFinished, parseInt(id)], (err, result) => {
          if (err) {
            reject(err)
          } else {
            resolve(result)
          }
        })
      })
    },

    editTodo: async (parent, args) => {
      const { id, description } = args
      const db = await getDB()

      const editQuery = `
        UPDATE todo SET description = ? WHERE id = ?
      `

      return new Promise((resolve, reject) => {
        db.query(editQuery, [description, parseInt(id)], (err, result) => {
          if (err) {
            reject(err)
          } else {
            resolve(result)
          }
        })
      })
    },

    deleteTodo: async (parent, args) => {
      const { id } = args
      const db = await getDB()
      const deleteQuery = 'DELETE FROM todo WHERE id = ?'
      return new Promise((resolve, reject) => {
        db.query(deleteQuery, parseInt(id), (err, result) => {
          if (err) {
            reject(err)
          } else {
            resolve(result)
          }
        })
      })
    }
  }
}
module.exports = resolvers
