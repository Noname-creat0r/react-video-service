const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Types } = require("mongoose");
const User = require("../models/User");

const key = process.env.KEY;

exports.signup = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    if (!email || !password || !name || !req.file) {
      const error = new Error("Fill all the inputs in form.");
      error.statusCode = 400;
      throw error;
    }

    const avatarId = req.file.id;
    const isSignedUp = await User.findOne({
      email: email,
    });

    if (isSignedUp) {
      const error = new Error("Error: there is user with this email!");
      error.statusCode = 403;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    if (!hashedPassword) {
      const error = new Error("Error while working with password");
      error.statusCode = 500;
      throw error;
    }

    const userData = {
      email: email,
      password: hashedPassword,
      name: name,
      avatar: avatarId,
    };

    const user = await User.create({ ...userData });
    await user.save();

    res.status(201).json({
      message: "New user has been signed up successfully.",
      userId: user._id,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.signin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;

  console.log(req.ip);
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error(
          "User with email: " + email + " could not be found."
        );
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong password for " + email);
        error.statusCode = 401;
        throw error;
      }

      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
        },
        key
      );

      const expirationDate = new Date().getTime() + 8639998;
      res.status(200).json({
        token: token,
        userId: loadedUser._id.toString(),
        expiresIn: expirationDate,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
