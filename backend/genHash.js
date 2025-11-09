import bcrypt from "bcryptjs";

const password = "demo123"; // type your password
const saltRounds = 10;

const hash = await bcrypt.hash(password, saltRounds);
console.log("Hashed password:", hash);
