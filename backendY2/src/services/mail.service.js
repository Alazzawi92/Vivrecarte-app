import nodemailer from "nodemailer";
import { env } from "../config/env.js";

const isProduction = process.env.NODE_ENV === "production";

const transporter = env.SMTP_ENABLED
  ? nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: Number(env.SMTP_PORT),
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    })
  : null;

let smtpReady = !transporter;

if (transporter) {
  transporter.verify((error, success) => {
    if (error) {
      smtpReady = false;
      console.error("Échec connexion SMTP :", error.message);
    } else {
      smtpReady = true;
      console.log("Connexion SMTP réussie :", success);
    }
  });
} else {
  console.warn("SMTP désactivé: les emails ne seront pas envoyés en local.");
}

// Service pour envoi des emails
export const MailService = {
  async sendVerificationEmail(email, token) {
    try {
      const link = `${env.CLIENT_URL}/api/auth/verify/${token}`;

      if (!transporter || !smtpReady) {
        console.log(`Verification link (dev): ${link}`);
        return;
      }

      await transporter.sendMail({
        from: `"CAMYS" <${env.SMTP_SENDER}>`, // Nom et email de l’expéditeur
        to: email,
        subject: "Email de vérification",
        html: `<h1>Bienvenue sur notre application</h1>
               <p>Veuillez cliquer sur le lien suivant pour vérifier votre email :</p>
               <a href="${link}" target="_blank" target="_blank">${link}</a>`,
      });
    } catch (err) {
      console.error("Erreur lors de l'envoi de l'email :", err.message);
      if (isProduction) {
        throw new Error("Impossible d'envoyer l'email de vérification");
      }

      // En local/dev, on ne bloque pas l'inscription si SMTP est mal configuré.
      const link = `${env.CLIENT_URL}/api/auth/verify/${token}`;
      console.warn("SMTP indisponible en local, lien de verification ci-dessous.");
      console.log(`Verification link (dev): ${link}`);
    }
  },
};