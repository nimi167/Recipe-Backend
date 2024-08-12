const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generateToken } = require('../utils/jwtUtils');

exports.signup = async (req, res) => {
  try {
    const { name, email, password, isTnc } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).send({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, isTnc });

    const authToken = generateToken({ user: { id: user.id } });
    res.status(200).json({ authToken });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error",error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send({ message: "Please try to login with correct credentials" });
    }

    const authToken = generateToken({ user: { id: user.id } });
    res.status(200).json({ authToken });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error",error });
  }
};

exports.googleSignup = async (req, res) => {
  try {
    const { name, email, password, isTnc } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const authToken = generateToken({ user: { id: existingUser.id } });
      return res.status(200).json({ authToken });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, isTnc });

    const authToken = generateToken({ user: { id: user.id } });
    res.status(200).json({ authToken });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error",error });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error" ,error});
  }
};
