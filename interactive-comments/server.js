import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();

import Comment from './models/Comment.js'
import User from  './models/User.js'

//to handle errors throught middleware
import 'express-async-errors'

// db and authenticateUser
import connectDB from './db/connect.js';

// routers
import commentsRouter from './routes/commentsRoutes.js'

// middlewares
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

app.use(express.json());
app.use('/api/v1/comments', commentsRouter);

app.get('/api/v1', (req, res) => {
  res.json({msg: 'hello world sdfasdf'})
})

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log('error connecting to database: ', error);
  }
};

start()
