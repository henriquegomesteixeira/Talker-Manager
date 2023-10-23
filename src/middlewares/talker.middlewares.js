const { readTalker, searchTalker } = require('../utils/fs.utils');

const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;

const validateNumberParam = (number) => {
  const numberParam = Number(number);
  if (numberParam < 1 || !Number.isInteger(numberParam) || numberParam > 5) {
      return true;
  } return false;
};

// Valida se o id passado na URL existe no arquivo talker.json
const validatetalkerId = async (req, res, next) => {
  const { id } = req.params;
  const talkers = await readTalker();
  const talkerId = talkers.find((talker) => talker.id === Number(id));

  if (!talkerId) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  next();
};

// Valida se o token existe e se tem o tamanho de 16 caracteres
const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });

  next();
};

// Validação do campo name
const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
      return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

// Validação do campo age
const validateAge = (req, res, next) => {
  const { age } = req.body;

  if (!age || age === '') return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (!Number.isInteger(age) || age < 18) {
    return res.status(400).json({
      message: 'O campo "age" deve ser um número inteiro igual ou maior que 18',
    });
  }
  
  next();
};

// Validação do campo talk
const validateTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk || talk === '') {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }

  next();
};

// Validação do campo watchedAt
const validateWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;

  if (!watchedAt) return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' }); 
  if (!datePattern.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

// Validação do campo rate
const validateRate = (req, res, next) => {
  const { rate } = req.body.talk || req.query;
  const { path } = req.route;
  const isNumberParamValid = validateNumberParam(rate);
  if (rate === undefined) {
      if (path !== '/search') {
      return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  return next();
  }
  if (isNumberParamValid) {
      return res.status(400)
      .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  next();
};

// Valida se o campo q existe na query
const validateSearch = async (req, res, next) => {
  const { q } = req.query;
  const search = await searchTalker(q);

  if (!search) return res.status(200).json([]);

  next();
};

// Valida se o campo date existe na query e se tem o formato dd/mm/aaaa
const validateDate = (req, res, next) => {
  const { date } = req.query;
  if (!date) return next();
  if (!datePattern.test(date)) {
      return res.status(400)
      .json({ message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

// Valida se o campo rate existe na query e se é um número inteiro entre 1 e 5
const validateSrchRate = (req, res, next) => {
  const { rate } = req.body;
  const isNumberParamValid = validateNumberParam(rate);
  if (rate === undefined) {
      return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (isNumberParamValid) {
      return res.status(400)
      .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  next();
};

// Diminui a quantidade de linhas no arquivo src/routes/talker.routes.js
const validateAll = [
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
];

module.exports = {
  validatetalkerId,
  validateToken,
  validateAll,
  validateSearch,
  validateRate,
  validateDate,
  validateSrchRate,
};