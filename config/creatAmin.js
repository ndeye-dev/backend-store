const bcrypt = require("bcryptjs");
const Admin = require("../models/modeleAdmin");

const createAdmin = async () => {
  try {
    const adminExist = await Admin.findOne({ email: "admin@gmail.com" });

    if (adminExist) {
      console.log("Un admin existe déjà !");
      return;
    }

    const hashedPassword = await bcrypt.hash("123", 10);
    const admin = new Admin({
      name: "Admin",
      email: "admin@gmail.com",
      motDePasse: hashedPassword,
    });

    await admin.save();
    console.log("Admin créé avec succès !");
  } catch (error) {
    console.error("Erreur lors de la création de l'admin:", error);
  }
};

module.exports = createAdmin;
