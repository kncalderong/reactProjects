import UnauthenticatedError from "../errors/unauthenticated.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthenticatedError("Authentication Invalid");
    }
    const token = authHeader.split(" ")[1];
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      //this is retrieved because the token was generated with only the ID info
      req.user = { userId: payload.userId };
    } catch (error) {
      throw new UnauthenticatedError("Authentication Invalid");
    }
  } catch (error) {
    next(error);
  }

  next();
};

export default auth;
