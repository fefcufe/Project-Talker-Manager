const { readFile } = require('fs').promises;

const readFIle = async () => {
    const data = await readFile('./talker.json', 'utf8');
    return JSON.parse(data);
};

module.exports = readFIle;