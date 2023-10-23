const express = require('express');
const { readTalker, addTalker, updateTalker, deleteTalker,
  searchTalker, editRate } = require('../utils/fs.utils');
const { validatetalkerId, validateAll, validateSearch,
  validateToken, validateRate, validateDate,
  validateSrchRate } = require('../middlewares/talker.middlewares');
const allTalkers = require('../db/talker.db');

const router = express.Router();

// Rota: GET /talker/db
router.get('/db', async (req, res) => {
  const [talkers] = await allTalkers();
  res.status(200).json(talkers);
}); 

// Rota: GET /talker
router.get('/', async (_req, res) => {
  try {
    const talkers = await readTalker();

    res.status(200).json(talkers);
  } catch (err) {
    console.error(err.message);
    res.status(200).json([]);
  }
});

// Rota: GET /talker/search?q=searchTerm
router.get('/search', validateToken, validateSearch, validateRate,
  validateDate, async (req, res) => {
  const { q, rate, date } = req.query;

  const search = await searchTalker(q, rate, date);
  res.status(200).json(search);
});

// Rota: GET /talker/:id
router.get('/:id', validatetalkerId, async (req, res) => {
  const { id } = req.params;
  const talkers = await readTalker();

  const talkerId = talkers.find((talker) => talker.id === Number(id));
  res.status(200).json(talkerId);
});

// Rota: POST /talker
router.post('/', validateToken, validateAll, async (req, res) => {
  const { name, age, talk } = req.body;

  const newTalker = await addTalker(name, age, talk);
  res.status(201).json(newTalker);
});

// Rota: PUT /talker/:id
router.put('/:id', validateToken, validatetalkerId, validateAll, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;

  const update = await updateTalker(id, name, age, talk);
  res.status(200).json(update);
});

// Rota: DELETE /talker/:id
router.delete('/:id', validateToken, validatetalkerId, async (req, res) => {
  const { id } = req.params;
  
  const message = await deleteTalker(id);
  res.status(204).json(message);
});

// Rota: PATCH /talker/:id
router.patch('/rate/:id', validateToken, validatetalkerId, validateSrchRate, async (req, res) => {
  const { id } = req.params;
  const { rate } = req.body;
  await editRate(id, Number(rate));
  res.status(204).end();
});

module.exports = router;