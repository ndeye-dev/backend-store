// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const Admin = require("../models/modeleAdmin");

// const login = async (req, res) => {
//   const { email, motDePasse } = req.body;

//   if (!email || !motDePasse) {
//     return res.status(400).json({ message: "L'email et le mot de passe sont requis" });
//   }

//   try {
//     const admin = await Admin.findOne({ email });

//     if (!admin) {
//       return res.status(401).json({ message: "Email incorrect" });
//     }

//     const isMatch = await bcrypt.compare(motDePasse, admin.motDePasse);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Mot de passe incorrect" });
//     }

//     const token = jwt.sign({ email: admin.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

//     res.json({ token, email: admin.email });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Erreur serveur" });
//   }
// };

// const getProfile = async (req, res) => {
//   res.json({ email: req.admin.email, role: "admin" });
// };

// module.exports = { login, getProfile };
