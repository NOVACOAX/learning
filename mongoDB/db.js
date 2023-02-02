const { MongoClient } = require("mongodb")

let dbConnection
let uri = 'mongodb+srv://novacoax:EUErVewOxZBwM3JU@nodetuts-magpie.gv7nzt3.mongodb.net/?retryWrites=true&w=majority'
let localhost = 'mongodb://localhost:27017/bookstore'

module.exports = {
  connectToDB: (cb) => {
    MongoClient.connect(uri)
      .then((client) => {
        dbConnection = client.db()
        return cb()
      })
      .catch((err => {
        console.log(err)
        return cb(err)
      }))
  },
  getDB: () => dbConnection
}