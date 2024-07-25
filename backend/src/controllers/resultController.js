const Result = require('../models/Result');

const getExamResults = async (req, res) => {
  const userId = req.user.id;
  const role= req.user.role;

  try {
    if(role==='admin'){
      const results = await Result.find().populate('course', 'name').populate('exam', 'name').populate('user', 'name');
      res.status(200).json({isSuccess:true, results});
    }else if(role==='member'){
      const results = await Result.find({ user: userId }).populate('course', 'name').populate('exam', 'name').populate('user', 'name');
      res.status(200).json({isSuccess:true, results});
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ isError: true, message: err.message });
  }
};


module.exports = {
  getExamResults,
};