import { Router } from "express";
import { UserModel, validate as validateUser } from "../model/user.js";
import bcrypt from "bcrypt";
import Joi from "joi";

const router = Router();

// User Registration Route
router.post("/register", async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });
    //  console.log("Incoming registration data:", req.body);
    const user = await UserModel.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already exists!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT) || 10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new UserModel({ ...req.body, password: hashPassword }).save();
const savedUser = await UserModel.findOne({ email: req.body.email }); // Fetch saved user
res.status(201).send({
  message: "User registered successfully!",
  user: {
    _id: savedUser._id, // Include `_id` in response
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  },
});

  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// User Login Route
router.post("/login", async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });
    // console.log("Incoming Login data:", req.body);
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).send({ message: "Invalid Email or Password" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).send({ message: "Invalid Email or Password" });

    const token = user.generateAuthToken();
    res.status(200).send({
      data: token,
      user: {
        user_id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      message: "Logged in successfully",
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.put("/update-password", async (req, res) => {
  console.log("Request body received:", req.body);
  const { userId, oldPassword, newPassword } = req.body;

  if (!userId || !oldPassword || !newPassword) {
    console.log("Validation failed: Missing fields");
    return res.status(400).send({ message: "All fields are required!" });
  }

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      console.log("User not found");
      return res.status(404).send({ message: "User not found!" });
    }

    const validPassword = await bcrypt.compare(oldPassword, user.password);
    if (!validPassword) {
      console.log("Old password is incorrect");
      return res.status(400).send({ message: "Old password is incorrect!" });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT) || 10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedNewPassword;
    await user.save();
    console.log("Password updated successfully");
    res.status(200).send({ message: "Password updated successfully!" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Login Validation Function
const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

export default router;
