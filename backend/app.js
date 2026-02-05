const express = require('express')
const cors = require('cors');
const indexRouter = require('./routers/indexRouter')


require('dotenv').config()
const app = express()
const port = process.env.PORT || 8080;

//Set-up url request body parsing
app.use(express.urlencoded({ extended: false }));
//Set-up cors access
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN ? process.env.ALLOWED_ORIGIN : ["http://localhost:5173"],
  credentials: true
}));
//Allow json 
app.use(express.json());

app.use('/', indexRouter);

//Catch all route
app.get("/*splat", (req, res) => {
  res.send("You cannot be here :( .");
});

//Error middleware
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({
    errMessage: err.message
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})