import { z } from "zod";

// Validation pour l'inscription avec confirm password
export const registrationSchema = z
  .object({
    email: z.email("Email invalide"), // format email obligatoire
    password: z.string()
      .min(8, "Mot de passe minimum 8 caractères")
      .regex(/[A-Z]/, "Au moins une majuscule")
      .regex(/[0-9]/, "Au moins un chiffre"),
    confirmPassword: z.string().min(1, "Veuillez confirmer le mot de passe")
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"], // l'erreur apparaîtra sur le champ confirmPassword
  });



  
// Validation pour le login
export const loginSchema = z.object({
  email: z.email("Email invalide"),
  password: z.string() // juste vérifier présence
});