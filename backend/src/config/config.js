
const { connect, default: mongoose } = require('mongoose')
const { logger } = require('../utils/logger')
const dotenv = require('dotenv')
const { program } = require('./commander')

const { mode } = program.opts()

dotenv.config({
   path: './.env' 
})
const configObject = {
    mongo_uri: process.env.MONGO_URI,
    jwt_key : process.env.JWT_SECRET_KEY
}

const connectDB = async () => {
  try {
      
      MongoSingleton.getInstance()
      logger.info("Db connected")
  } catch(err) {
      logger.error(err)
  }
}

class MongoSingleton {
  static instance 
  constructor() {
    connect("mongodb+srv://nikiamado123:44871024Niki@proyectobackend.zqmzfsc.mongodb.net/NotesTagsDb?retryWrites=true&w=majority")
  }

  static getInstance() {
    if(!this.instance){
      logger.info('Connecting to data base')
      return this.instance = new MongoSingleton()
    }
    logger.info('Data base already connected')
    return this.instance
  }
}

module.exports = {
  configObject,
  connectDB,
}