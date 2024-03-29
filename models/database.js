let mongoose = require('mongoose');
let express = require('express');

const server = '127.0.0.1:27017';
const database = "portnabil";

class Database {
  constructor() {
    this._connect()
  }
  
_connect() {
     mongoose.connect(`mongodb://${server}/${database}`)
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })
  }
} 

module.exports = Database;