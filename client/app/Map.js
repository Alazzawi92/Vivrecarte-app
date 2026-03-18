import { Alert, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Button from '../components/Button';
import { useAuthStore } from '../store/authStore';
import { locationService } from '../services/locationService';

const Map = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [region, setRegion] = useState(null);
  const [activeUsers, setActiveUsers] = useState([]);
  const mapRef = useRef(null);
  const { user: currentUser } = useAuthStore();

  useEffect(() => {
    let subscription;

    const initLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'permission refusee',
          'autoorisez la locaisation pour pour utiliser la map '
        );
        return;
      }

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          distanceInterval: 3,
        },
        async (loc) => {
          const { latitude, longitude } = loc.coords;

          setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });

          try {
            await locationService.updateLocation(latitude, longitude);
          } catch (error) {
            console.log('error');
          }
        }
      );
    };

    const fetchUsers = async () => {
      try {
        const users = await locationService.getActiveUsers();
        setActiveUsers(users);
      } catch (error) {
        console.log('error lors de fetch', error);
      }
    };

    initLocation();
    fetchUsers();

    const interval = setInterval(fetchUsers, 3000);

    return () => {
      subscription?.remove();
      clearInterval(interval);
    };
  }, []);

  if (!region) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          position: 'absolute',
          top: insets.top + 10,
          right: 20,
          zIndex: 10,
        }}
      >
        <Button title="Retour" onPress={() => navigation.navigate('Profile')} />
      </View>

      <MapView
        ref={mapRef}
        style={styles.map}
        region={region}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        {activeUsers.map((user) => {
          const lat = parseFloat(user.latitude);
          const lon = parseFloat(user.longitude);

          if (isNaN(lat) || isNaN(lon)) {
            return null;
          }

          const isMe = user.id === currentUser?.id;

          return (
            <Marker
              key={`${user.id}-${isMe ? 'red' : 'yellow'}`}
              coordinate={{ latitude: lat, longitude: lon }}
              pinColor={isMe ? 'red' : 'yellow'}
            >
              <Callout tooltip>
                <View
                  style={{
                    backgroundColor: '#fff',
                    padding: 5,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: '#2bd3db',
                  }}
                >
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: isMe ? 'red' : 'yellow',
                    }}
                  >
                    {isMe ? 'moi' : 'pas moi'}
                    {user.email}
                  </Text>
                  <Text>{isMe ? 'Moi' : user.email}</Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

