const { db } = require("../config/firebase");

exports.createAlert = async (req, res) => {
  try {
    const data = req.body;
    const alertRef = await db.collection("alerts").add({
      ...data,
      status: "pending",
      createdAt: new Date()
    });
    res.status(201).json({ id: alertRef.id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.getAlerts = async (req, res) => {
  const snapshot = await db.collection("alerts").where("status","==","verified").get();
  const alerts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(alerts);
};

exports.verifyAlert = async (req, res) => {
  await db.collection("alerts").doc(req.params.id).update({
    status: "verified"
  });
  res.json({ message: "Alert verified" });
};
