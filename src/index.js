const express = require('express');
const talkerRoutes = require('./routes/talker.routes');
const loginRoutes = require('./routes/login.routes');

const app = express();
app.use(express.json());

// Rotas para manipular tanto os endpoints
app.use('/talker', talkerRoutes);
app.use('/login', loginRoutes);

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
