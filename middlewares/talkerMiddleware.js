const nameValidation = (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    if (name.length < 3) {
        return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    return next();
  } catch (e) {
    return res.status(401).json({ message: e });
  }
};

const ageValidation = (req, res, next) => {
  try {
    const { age } = req.body;
    if (!age) {
        return res.status(400).json({ message: 'O campo "age" é obrigatório' }); 
    }
    if (age < 18) {
      return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
    return next();
  } catch (e) {
    return res.status(401).json({ message: e });
  }
};

const talkValidation = (req, res, next) => {
    try {
      const { talk } = req.body;
      if (!talk) {
          return res.status(400).json({ message: 'O campo "talk" é obrigatório' }); 
      }
      return next();
    } catch (e) {
      return res.status(401).json({ message: e });
    }
  };

const watchedAtValidation = (req, res, next) => {
    try {
        const { talk: { watchedAt } } = req.body;
        // retirado de https://stackoverflow.com/questions/5465375/javascript-date-regex-dd-mm-yyyy
        const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/; 
        if (!watchedAt) {
          return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
        }
        if (!dateRegex.test(watchedAt)) {
          return res.status(400).json({ 
              message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"', 
            });
        }
        return next(); 
    } catch (e) {
        return res.status(401).json({ message: e });
    }
};

const rateValidation = (req, res, next) => {
    try {
        const { talk: { rate } } = req.body;
    
        if ([undefined, null, ''].includes(rate)) {
          return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
        }
        if (rate < 1 || rate > 5) {
          return res.status(400).json({ 
              message: 'O campo "rate" deve ser um inteiro de 1 à 5', 
            });
        }
        return next(); 
    } catch (e) {
        return res.status(401).json({ message: e });
    }
};
      
module.exports = {
    nameValidation,
    ageValidation,
    talkValidation,
    watchedAtValidation,
    rateValidation,
};