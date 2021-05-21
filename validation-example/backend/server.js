const express = require('express');
const cookieParser = require('cookie-parser');

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');

const app = express();

app.use(express.json());
app.use(express.static('../frontend'));
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.listen(8000, () => {
  console.log('Server started');
});

/**
 * Token-based authentication JWT
 * 
 * 1. När vi skapar konto generera ett id (ex. nanoid) och spara med användaren
 * i databasen.
 * 2. När vi loggar in så verifiera inloggningsuppgifter och signera en token (id + auth token)
 * 3. Vid varje request skicka med från frontend token i authorization header och verifera denna på servern
 * 4. Om token stämmer så skicka tillbaka begärd data
 * 5. Om token inte stämmer skicka tillbaka felmeddelande
 */