const { writeFile } = require('fs').promises;

const writeFIle = async (array) => {
    writeFile('./talker.json', JSON.stringify(array));
};

module.exports = writeFIle;