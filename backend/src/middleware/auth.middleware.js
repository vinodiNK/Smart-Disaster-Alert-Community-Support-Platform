const { auth, db } = require("../config/firebase");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = await auth.verifyIdToken(token);
    const userDoc = await db.collection("users").doc(decoded.uid).get();

    req.user = {
      uid: decoded.uid,
      ...userDoc.data()
    };

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
