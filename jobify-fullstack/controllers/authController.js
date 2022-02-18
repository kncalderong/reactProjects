import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";

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
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestError("Please provide all values");
    }
    //to include again the password in the document retrieved from mongoDB
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new UnauthenticatedError("Invalid Credentials");
    }

    //it will compare the password with the one included in the findOne result
    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid Credentials");
    }
    const token = user.createJWT();
    user.password = undefined;

    res.status(StatusCodes.OK).json({ user, token, location: user.location });
  } catch (error) {
    next(error);
  }
};

//***************UPDATE************//
const updateUser = async (req, res, next) => {
  try {
    const { email, name, lastName, location } = req.body;

    if (!email || !name || !lastName || !location) {
      throw new BadRequestError("Please provide all values");
    }
    const user = await User.findOne({ _id: req.user.userId });
    console.log("user prechanged", user);

    user.name = name;
    user.email = email;
    user.lastName = lastName;
    user.location = location;

    console.log(user);
    await user.save();

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
      user,
      token,
      location: user.location,
    });
  } catch (error) {
    next(error);
  }
};

export { register, login, updateUser };
