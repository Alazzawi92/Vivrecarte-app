// env.js
import "dotenv/config";

/**
 * Choix du provider SMTP
 */
const provider = process.env.MAIL_PROVIDER || "nodemailer";

// Vérification minimale des variables critiques
const requiredVars = [
  "DB_HOST",
  "DB_USER",
  "DB_NAME",
  "JWT_SECRET",
  "CLIENT_URL",

];

requiredVars.forEach((key) => {
  if (!process.env[key]) {
    console.error(`Missing required environment variable: ${key}`);
    process.exit(1); // Arrêt si variable manquante
  }
});

// Configuration centralisée
export const env = {
  PORT: Number(process.env.PORT) || 5000,

  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS ?? "",
  DB_NAME: process.env.DB_NAME,

  JWT_SECRET: process.env.JWT_SECRET,

  SMTP_HOST: 
    provider === "brevo"
      ? process.env.BREVO_SMTP_HOST
      : process.env.SMTP_HOST,

  SMTP_USER:
    provider === "brevo"
      ? process.env.BREVO_SMTP_USER
      : process.env.SMTP_USER,

  SMTP_PASS:
    provider === "brevo"
      ? process.env.BREVO_SMTP_PASS
      : process.env.SMTP_PASS,

  SMTP_PORT:
    provider === "brevo"
      ? Number(process.env.BREVO_SMTP_PORT)
      : Number(process.env.SMTP_PORT),

  SMTP_SENDER:
    provider === "brevo"
      ? process.env.BREVO_SMTP_SENDER
      : process.env.SMTP_SENDER,

  CLIENT_URL: process.env.CLIENT_URL,
  SMTP_ENABLED: Boolean(
    (provider === "brevo"
      ? process.env.BREVO_SMTP_HOST && process.env.BREVO_SMTP_USER && process.env.BREVO_SMTP_PASS && process.env.BREVO_SMTP_SENDER
      : process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.SMTP_SENDER)
  ),
};
