const express = require('express');
const bodyParser = require('body-parser');
const readFIle = require('./helpers/readFile');

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
