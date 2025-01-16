import User from "../Schema/UserModal.js";

export const handleSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      console.log("please enter valid credentials..");
    }
    const newUser = new User({ name, email, password });
    const saveUser = await newUser.save();
    console.log("save User Data", saveUser);
    res.status(200).json({ message: "User Signup Sucessfully", saveUser });
  } catch (error) {
    console.error("Error saving note:", error);
    res.status(500).json({ message: "error", error });
  }
};
