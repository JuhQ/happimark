module.exports = (settings) ->
  mongoose = require('mongoose')

  userSchema = mongoose.Schema {
    id: 'Number'
    name: 'String'
    username: { type: String, lowercase: true, trim: true }
    url: 'String'
    gender: 'String'
    location: 'String'
    occupation: 'String'
    education: 'String'
    email: 'String'
    quotes: 'String'
    bio: 'String'
    birthday: 'Date'
    created: { type: Date, default: Date.now }
    hidden: { type: Boolean, default: false }
    random: {type: [Number], index: '2d', default: -> return [Math.random(), Math.random()]}
  }
  locationSchema = mongoose.Schema {
    id: 'Number'
    name: 'String'
    created: { type: Date, default: Date.now }
  }
  linkSchema = mongoose.Schema {
    user: 'ObjectId'
    category: 'ObjectId'
    url: {type: String, required: true}
    title: {type: String, required: true}
    description: 'String'
    screenshot: 'String'
    archived: { type: Boolean, default: false }
    created: { type: Date, default: Date.now }
    random: {type: [Number], index: '2d', default: -> return [Math.random(), Math.random()]}
  }
  categorySchema = mongoose.Schema {
    user: 'ObjectId'
    name: 'String'
    title: 'String'
    description: 'String'
    created: { type: Date, default: Date.now }
  }

  mongoose.model 'users', userSchema
  mongoose.model 'locations', locationSchema
  mongoose.model 'links', linkSchema
  mongoose.model 'categories', categorySchema

  db = mongoose.connection

  db.on 'error', (error) ->
    console.log 'Mongodb returned error: %s', error

  db.on 'disconnected', ->
    console.log 'Mongodb connection disconnected'
    mongoose.connect 'localhost', settings.db

  mongoose.connect 'localhost', settings.db
