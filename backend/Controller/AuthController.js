import User from "../Schema/UserModal.js";
import argon2 from "argon2";

export const handleSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      console.log("please enter valid credentials..");
    }
    const hashPassword = await argon2.hash(password);
    const newUser = new User({ name, email, password: hashPassword });
    const saveUser = await newUser.save();
    console.log("save User Data", saveUser);

    res.status(200).json({ message: "User Signup Sucessfully", saveUser });
  } catch (error) {
    console.error("Error saving note:", error);
    res.status(500).json({ message: "error", error });
  }
};

export const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validate inputs
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please enter valid credentials." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password." });
    }

    // Password is valid
    res.status(200).json({ message: "Login successful.", user });
  } catch (error) {
    console.log(error);
  }
};
