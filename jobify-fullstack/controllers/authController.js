import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";

//***************REGISTER************//
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new BadRequestError("Please provide all values");
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      throw new BadRequestError("Email already in use");
    }

    const user = await User.create(req.body);
    const token = user.createJWT();

    res.status(StatusCodes.CREATED).json({
      user: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        location: user.location,
      },
      token,
      location: user.location,
    });
  } catch (error) {
    next(error);
  }
};

//***************LOGIN************//
const login = async (req, res) => {
  res.send("login");
};

//***************UPDATE************//
const updateUser = async (req, res) => {
  res.send("updateUser");
};

export { register, login, updateUser };
