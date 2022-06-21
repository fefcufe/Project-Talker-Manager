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

app.get('/talker', async (req, res) => {
  try {
    const talkersList = await readFIle();
    console.log(talkersList);
    res.status(200).json(talkersList);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});
