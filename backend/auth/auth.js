import User from "../models/auth.js";
import bcrypt from "bcrypt";

// REGISTER CONTROLLER
export const register = async (req, res) => {
  try {
    const { fName, lName, email, password, cPassword } = req.body;

    // Validation
    if (
      !fName?.trim() ||
      !lName?.trim() ||
      !email?.trim() ||
      !password ||
      !cPassword
    ) {
      return res.status(400).json({ msg: "Please fill in all fields" });
    }

    if (password !== cPassword) {
      return res.status(400).json({ msg: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fName,
      lName,
      email,
      password: hashedPassword,
      cPassword: hashedPassword,
      role: "client", // Default role
    });

    await user.save();
    return res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};

// LOGIN CONTROLLER (for clients)
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Please fill in all fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    req.session.user = {
      id: user._id,
      email: user.email,
      role: user.role || "client",
    };

    return res.status(200).json({
      msg: "Login successful",
      role: user.role || "client",
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};
export const logout = async (req, res) => {
    try {
        req.session.destroy((err) => {
          if (err) return res.status(500).json({ msg: "Logout failed" });
          res.clearCookie("connect.sid"); // if using cookie-based session
          res.json({ msg: "Logged out" });
        });
    
    } catch (err) {
        console.error("Logout error:", err);
    }
}


// ADMIN LOGIN CONTROLLER (Hardcoded)
const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "admin123";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // ✅ Set session
      req.session.user = {
        email,
        role: "admin",
      };

      return res.status(200).json({
        message: "Admin login successful",
        role: "admin",
      });
    }

    return res.status(401).json({ message: "Unauthorized: Not an admin." });
  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};
