import { StyleSheet, Text, View, Alert } from 'react-native'
import { Button } from '../components/Button'



const Profile = () => {
  const {token, logout, user} = useAuthStore()
  const userEmail = user?.email || 'No email available';
  
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: async () => {
        try {
          await logout();
          NavigationActivation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        } catch (error) {
          console.error('Logout failed:', error);
          Alert.alert('Error', 'Failed to logout. Please try again.');
        }     

      }},
    ]); 
  } 
  return (
    <View style={styles.container}> 
      <Button title='Logout' onPress={handleLogout} />
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})