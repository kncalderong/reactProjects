import mongoose from "mongoose";
import dotenv from "dotenv";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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
    validate: {
      //this validator function comes from an external package
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
    minLength: 6,
    select: false,
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

//this is a mongoose middleware to hash the password before save it
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  //this.password is refered to the password on the document being created
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

//to compare the password from the login and that stored in the database
//this method is like a customHook
// UserSchema.methods.comparePassword = async function (candidatePassword) {
//   //this.password is the value retrieved from the database
//   const isMatch = await bcrypt.compare(candidatePassword, this.password);
//   return isMatch;
// };

export default mongoose.model("User", UserSchema);
