const connection = require('./connection');

// Busca todos os talkers do banco
const allTalkers = () => connection.execute(`
SELECT
    age,
    id,
    name,
    JSON_OBJECT('rate', talk_rate, 'watchedAt', talk_watched_at) AS talk
FROM TalkerDB.talkers;
`);

module.exports = allTalkers;