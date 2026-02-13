const { auth, db } = require("../config/firebase");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await auth.createUser({
      email,
      password
    });

    await db.collection("users").doc(user.uid).set({
      name,
      email,
      role: role || "public",
      verified: false,
      active: true,
      createdAt: new Date()
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  res.status(200).json({
    message: "Login handled by Firebase frontend SDK"
  });
};
