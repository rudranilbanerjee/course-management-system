const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register Admin
const register = async (req, res) => {
  const { name, email, password, phone, gender } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ isError:true, message: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password,
      phone,
      gender,
      role:'admin'
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user._id,
        role: user.role,
      },
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'None'});
    res.status(201).json({ isSuccess:true, isRegister:true, userId:user._id, role:user.role, message: 'User registered successfully' });

  } catch (err) {
    console.error(err.message);
    res.status(400).json({ isError:true, message: err.message });

  }
};

// Login Admin and Member
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ isError:true,message: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ isError:true, message: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: user._id,
        role: user.role,
      },
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5 days' }
    );

    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'None'});
    res.status(201).json({ isSuccess:true, isLogin:true, userId:user._id, role:user.role, message: 'User login successfully1' });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ isError:true, message: err.message });
  }
};

const logout = (req, res) => {
  res.clearCookie('token');
  res.json({ isSuccess:true, message: 'User logged out successfully' });
};


module.exports = {
  register,
  login,
  logout
};
