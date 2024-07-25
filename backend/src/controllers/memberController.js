const User = require('../models/User');
const bcrypt = require('bcryptjs');

const createMember = async (req, res) => {
    const { name, email, password, phone, gender } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ isError: true, message: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password,
            phone,
            gender,
            role: 'member',
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.status(200).json({ isSuccess: true, user });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ isError:true, message: err.message });
    }
};

module.exports = {
    createMember,
};
