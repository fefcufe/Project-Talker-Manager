const express = require('express');
const bodyParser = require('body-parser');
const readFIle = require('./helpers/readFile');
const writeFIle = require('./helpers/writeFile');
const randomToken = require('./helpers/generateToken');
const authMiddleware = require('./middlewares/tokenMiddleware');

const loginMiddleware = require('./middlewares/loginMiddleware');
const { nameValidation, ageValidation, 
  talkValidation, watchedAtValidation, rateValidation } = require('./middlewares/talkerMiddleware');

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

// requisito 3 e 4
app.post('/login', loginMiddleware, (req, res) => {
  try {
  const token = randomToken();
  // console.log(token);
  return res.status(200).json({ token });
  } catch (error) {
    return res.status(400).send({ message: error });
  }
});

// requisito 5
app.post('/talker', authMiddleware, nameValidation, 
  ageValidation, talkValidation, watchedAtValidation, rateValidation, async (req, res) => {
  try {
    const { name, age, talk } = req.body;
    const talkers = await readFIle(); 
    const newTalker = {
      id: talkers.length + 1,
      name,
      age,
      talk,
    };
    talkers.push(newTalker);
    writeFIle(talkers);
    return res.status(201).json(newTalker);
  } catch (e) {
    return res.status(400).send({ message: e });
  }
});

app.put('/talker/:id', authMiddleware, nameValidation, 
  ageValidation, talkValidation, watchedAtValidation, rateValidation, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const talkers = await readFIle();
    const updateTalker = {
      id: Number(id),
      name,
      age,
      talk,
    };
    const talkerIndex = talkers.findIndex((element) => element.id === Number(id));
    talkers[talkerIndex] = updateTalker;
    writeFIle(talkers);
    res.status(200).json(updateTalker);
    } catch (e) {
    return res.status(400).send({ message: e });
  }
});
