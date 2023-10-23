const fs = require('fs/promises');
const path = require('path');

// Caminho do arquivo talker.json
const talkerPath = path.resolve(__dirname, '../talker.json');

// Lê o arquivo talker.json
const readTalker = async () => {
  const talkerRead = await fs.readFile(talkerPath, 'utf-8');
  return JSON.parse(talkerRead);
};

// Escreve no arquivo talker.json
const addTalker = async (name, age, talk) => {
  const talker = await readTalker();
  const newTalker = {
    name,
    age,
    id: talker.length + 1,
    talk,
  };

  await fs.writeFile(talkerPath, JSON.stringify([...talker, newTalker]));
  return newTalker;
};

// Atualiza o arquivo talker.json
const updateTalker = async (id, name, age, talk) => {
  const talkers = await readTalker();

  const talkerId = talkers.findIndex((talker) => talker.id === Number(id));
  const update = {
    id: Number(id),
    name,
    age,
    talk,
  };

  talkers[talkerId] = update;
  await fs.writeFile(talkerPath, JSON.stringify(talkers));
  return update;
};

// Deleta um talker de acordo com o id do arquivo talker.json
const deleteTalker = async (id) => {
  const talkers = await readTalker();

  const talkerId = talkers.findIndex((talker) => talker.id === Number(id));
  talkers.splice(talkerId, 1);

  await fs.writeFile(talkerPath, JSON.stringify(talkers));
  return { message: 'Pessoa palestrante deletada com sucesso' };
};

// Busca um talker de acordo com o nome passado na query
const searchTalker = async (q, rate, date) => {
  const talkers = await readTalker();

  const srch = talkers.filter((talker) => {
    if (q) return talker.name.includes(q);
    return true;
  }).filter((talker) => {
    if (rate) return talker.talk.rate === Number(rate);
    return true;
  }).filter((talker) => {
    if (date) return talker.talk.watchedAt === date;
    return true;
  });
  return srch;
};

// Edita a avaliação de um talker de acordo com o id
const editRate = async (id, rate) => {
  const talker = await readTalker();
  const index = talker.findIndex((tk) => tk.id === Number(id));
  talker[index].talk.rate = rate;
  const editedRate = JSON.stringify(talker);
  await fs.writeFile(talkerPath, editedRate);
};

module.exports = {
  readTalker,
  addTalker,
  updateTalker,
  deleteTalker,
  searchTalker,
  editRate,
};