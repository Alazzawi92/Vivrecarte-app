import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Alert,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../utils/validation"; // <- named import
import InputField from "../components/InputField";
import Button from "../components/Button";
import { authService } from "../services/authService";

export default function Register({ navigation }) {
  const [passwordShown, setPasswordShown] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      const payload = {
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      };
      await authService.register(payload);
      Alert.alert("Succès", "Compte créé");
      reset();
      navigation.navigate("Login");
    } catch (error) {
      console.log("Register error:", error.response?.data || error.message || error);
      Alert.alert("Erreur", "Inscription impossible");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <InputField
            placeholder="Email"
            value={value}
            onChangeText={onChange}
            error={errors.email?.message}
            autoCapitalize="none"
            textContentType="emailAddress"
            autoComplete="email"
            keyboardType="email-address"
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <InputField
            placeholder="Mot de passe"
            secureTextEntry={!passwordShown}
            value={value}
            onChangeText={onChange}
            error={errors.password?.message}
            autoCapitalize="none"
            textContentType="password"
          />
        )}
      />

      <TouchableOpacity onPress={() => setPasswordShown((prev) => !prev)}>
        <Text style={styles.toggleText}>
          {passwordShown ? "Cacher" : "Afficher"} mot de passe
        </Text>
      </TouchableOpacity>

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value } }) => (
          <InputField
            placeholder="Confirmer mot de passe"
            secureTextEntry={!passwordShown}
            value={value}
            onChangeText={onChange}
            error={errors.confirmPassword?.message}
            autoCapitalize="none"
            textContentType="password"
          />
        )}
      />
       <TouchableOpacity onPress={() => setPasswordShown((prev) => !prev)}>
        <Text style={styles.toggleText}>
          {passwordShown ? "Cacher" : "Afficher"} mot de passe
        </Text>
      </TouchableOpacity>

      <Button title="Créer un compte" onPress={handleSubmit(onSubmit)} />

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.linkText}>J'ai déjà un compte ? Connectez-vous</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  toggleText: {
    color: "#2db3bd",
    textAlign: "right",
    marginBottom: 10,
  },
  linkText: {
    color: "#2db3bd",
    textAlign: "center",
    marginTop: 20,
  },
});
