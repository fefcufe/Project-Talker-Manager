const express = require('express');
const bodyParser = require('body-parser');
const readFIle = require('./helpers/readFile');
const randomToken = require('./helpers/generateToken');

/* const loginMiddleware = require('./middlewares/loginMiddleware'); */

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

// requisito 1
app.get('/talker', async (req, res) => {
  try {
    const talkersList = await readFIle();
    console.log(talkersList);
    res.status(200).json(talkersList);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// requisito 2
app.get('/talker/:id', async (req, res) => {
  try {
    const talkers = await readFIle();
    const { id } = req.params;
    const talker = talkers.find((eachTalker) => eachTalker.id === Number(id));
    if (!talker) res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    res.status(200).json(talker);
  } catch (error) {
    res.status(400).send('Erro!'); 
  }
});

// requisito 3
app.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if ([email, password].includes(undefined)) {
      return res.status(400).json({ message: 'Faltando informações.' });
    }
  
  const token = randomToken();
  console.log(token);
  return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).end();
  }
});
