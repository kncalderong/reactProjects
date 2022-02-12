import mongoose from "mongoose";
import dotenv from "dotenv";
import validator from "validator"

dotenv.config();

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide a name"],
    minLength: 3,
    maxLength: 50,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "please provide an email"],
    validate:{
      //this validator function comes from an external package
      validator:validator.isEmail,
      message:"Please provide a valid email"
    }
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
    minLength: 6,
  },
  lastName: {
    type: String,
    maxLength: 20,
    trim: true,
    default: "lastName",
  },
  location: {
    type: String,
    maxLength: 20,
    trim: true,
    default: "myCity",
  },
});

export default mongoose.model("User", UserSchema);
