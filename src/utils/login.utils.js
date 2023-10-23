const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

// Gera um token aleatório
const generateRandomToken = (length) => Array.from({ length }).reduce((acc) => {
  const generateRandom = Math.floor(Math.random() * characters.length);
  return acc + characters.charAt(generateRandom);
}, '');

module.exports = generateRandomToken;