const loginMiddleware = (req, res, next) => {
  const { email, password } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validEmail = emailRegex.test(email);
  const MIN_LENGTH = 6;
  const validPassword = password.length > MIN_LENGTH;
  if (!email) {
      return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!validEmail) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  } 
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (!validPassword) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return next();
};

module.exports = loginMiddleware;
