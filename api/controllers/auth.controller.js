import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  //Hash the password
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    console.log("Registering user:", { username, email, password: hashedPassword });

    //Store user in DB
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    console.log(newUser);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error during user registration:", err);
    res.status(500).json({ message: " failed to create user" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    //CHECK IF THE USER EXIST
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user) return res.status(401).json({ message: "invalid credentials" });
    //CHECK IF THE PASSWORD IS CORRECT
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "invalid credentials" });

    // GENERATE COOKIE TOKEN AND SEND TO THE USER
    // res.setHeader("Set-Cookie", "test=" + "myValue").json("success")
    const AGE = 1000 * 60 * 60 * 24 * 7; // 7 days
    const token = jwt.sign(
      { 
        id: user.id,
        isAdmin:true
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: AGE },
    );

    const {password:userPassword, ...userInfo}=user


    res.cookie("token", token, {
        httpOnly: true,
        // secure:true,
        maxAge: AGE,
      }).status(200).json(userInfo);
      console.log("User logged in successfully:");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "login Failed!" });
  }
};

export const logout = (req, res) => {
  console.log("User logged out successfully");
  res.clearCookie("token").status(200).json({ message: "logout successful" });
};
