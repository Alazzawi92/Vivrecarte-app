import {
  KeyboardAvoidingView,
  Alert,
  TouchableOpacity,
  Text,
  Platform,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "../utils/validation";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { authService } from "../services/authService";
import { useAuthStore } from "../store/authStore";

const Login = ({ navigation }) => {
  const { setToken } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

 const onSubmit = async (data) => {
    try {
      const token = await authService.login(data);
      await setToken(token, data);
      Alert.alert("Succès", "Connexion réussie");
    } catch (error) {
      console.log(error.response?.data || error);
      Alert.alert("Erreur", "Connexion impossible");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, justifyContent: "center", padding: 20 }}
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
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="emailAddress"
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <InputField
            placeholder="Mot de passe"
            secureTextEntry
            value={value}
            onChangeText={onChange}
            error={errors.password?.message}
          />
        )}
      />

      <Button title="Connexion" onPress={handleSubmit(onSubmit)} />

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={{ color: "#2db3bd", textAlign: "center", marginTop: 20 }}>
          Pas de compte ? Inscrivez-vous
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default Login;
