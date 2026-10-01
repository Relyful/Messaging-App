const express = require('express');
const cors = require('cors');
const indexRouter = require('./routers/indexRouter');
const userRouter = require('./routers/userRouter');
const chatRouter = require('./routers/chatRouter');
const messageRouter = require('./routers/messageRouter');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

// 1. Trust Railway proxy
app.set('trust proxy', 1);

// 2. CORS setup
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN ? process.env.ALLOWED_ORIGIN : ["http://localhost:5173"],
  credentials: true
}));

// 3. Body parsers
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// 4. Routers
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/chat', chatRouter);
app.use('/message', messageRouter);

// 5. Catch-all route
app.get("/*splat", (req, res) => {
  res.send("You cannot be here :( .");
});

// 6. Global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    status: statusCode,
    errMessage: message
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});