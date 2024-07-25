
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = (role) => async (req, res, next) => {
  const token = req.cookies.token;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.user.id, role });

    if (!user) {
      return res.status(401).send({ isError:true, message: 'Not authorized' });
    }

    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).send({ isError:true, message: 'Not authorized' });
  }
};

module.exports = auth;


