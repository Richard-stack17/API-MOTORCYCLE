const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { db } = require('../database/db');
const { usersRouter } = require('../routes/user.routes');
const { repairsRouter } = require('../routes/repair.routes');
const initModel = require('./init.model');
const globalErrorHandler = require('../controllers/error.controller');
const AppError = require('../utils/appError');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 5000;
    this.paths = {
      user: '/api/v1/user',
      repairs: '/api/v1/repairs',
    };
    this.database();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    if (process.env.NODE_ENV === 'development') {
      console.log('HOLA ESTOY EN DESARROLLO');
      this.app.use(morgan('dev'));
    }
    if (process.env.NODE_ENV === 'production') {
      console.log('HOLA ESTOY EN PRODUCCIÓN');
    }
    this.app.use(cors());
    this.app.use(express.json());
  }
  routes() {
    this.app.use(this.paths.user, usersRouter);
    this.app.use(this.paths.repairs, repairsRouter);
    this.app.all('*', (req, res, next) => {
      return next(
        new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
      );
    });
    this.app.use(globalErrorHandler);
  }
  database() {
    db.authenticate()
      .then(() => console.log('Database authenticated'))
      .catch(err => console.log(err));

    initModel();

    db.sync()
      .then(() => {
        console.log('Database synced');
      })
      .catch(err => console.log(err));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log('Server is running on port', this.port);
    });
  }
}

module.exports = Server;
