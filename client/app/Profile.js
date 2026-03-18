import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { useAuthStore } from "../store/authStore";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";

const Profile = () => {
 const { token, logout, user } = useAuthStore();
  const navigation = useNavigation();

//   On utilise directement user.email
  // Le "?." sert à éviter un crash si user est vide au chargement
  const userEmail = user?.email || "Email non trouvé";

  const handleLogout = () => {
    // On affiche l'alerte de confirmation
    Alert.alert(
      "Confirmer la déconnexion",
      "Êtes-vous sûr de vouloir vous déconnecter ?",
      [
        { text: "Non", style: "cancel" },
        { 
          text: "Oui", 
          style: "destructive", 
          onPress: async () => {
            try {
              await logout(); // la pile publique s'affiche automatiquement
            } catch (error) {
              Alert.alert("Erreur", "Impossible de se déconnecter");
            }
          } 
        }
      ]
    );
  };

  return (
    <View style={styles.container}>

    { <Loading />}
      <Text style={styles.title}>Profil utilisateur</Text>

      <Text style={styles.label}>Email :</Text>
      <Text style={styles.info}>{userEmail}</Text>

     

      <View style={styles.button}>
        <Button title="Voir la Map" onPress={() => navigation.navigate("Map")} />
      </View>

      <View style={styles.button}>
        <Button title="Se déconnecter" color="#e74c3c" onPress={handleLogout} />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  label: { fontWeight: "bold", marginTop: 10 },
  info: { fontSize: 16, color: "gray" },
  button: { marginTop: 20, width: "100%" },
});