const express = require('express')
const cors = require('cors');
const expressSession = require('express-session');
const { prisma } = require('./lib/prisma.mjs');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const indexRouter = require('./routers/indexRouter');
const userRouter = require('./routers/userRouter');
const chatRouter = require('./routers/chatRouter');
const messageRouter = require('./routers/messageRouter');


require('dotenv').config()
const app = express()
const port = process.env.PORT || 8080;

//Set up session in prisma db
app.use(
  expressSession({
    cookie: {
     maxAge: 7 * 24 * 60 * 60 * 1000 // ms aka a week
    },
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(
      prisma,
      {
        checkPeriod: 2 * 60 * 1000,  //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }
    )
  })
);

//Set-up url request body parsing
app.use(express.urlencoded({ extended: false }));
//Set-up cors access
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN ? process.env.ALLOWED_ORIGIN : ["http://localhost:5173"],
  credentials: true
}));
//Allow json 
app.use(express.json());
//Session set-up
app.use(passport.session());


//Setup passport-local strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await prisma.user.findUnique({
      where: {
        username
      }
    })
    if (!user) {
      return done(null, false)
    };
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return done(null, false);
    }
    return done(null, user);
  })
)

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id
    }
  })
  done(null, user);
});

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/chat', chatRouter);
app.use('/message', messageRouter);

//Catch all route
app.get("/*splat", (req, res) => {
  res.send("You cannot be here :( .");
});

//Error middleware
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
  console.log(`Server running on port ${port}`)
})