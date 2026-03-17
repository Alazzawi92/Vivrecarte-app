import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

export const useAuthStore = create((set)=> ({
token:null,
user:null,
isAuthenticated:false,
// on va interoger modifier ou recuperer les infos du token de user

setToken: async (token,userData) => {
await SecureStore.setItemAsync('token', token);
set({ token: token, 
      user: userData,
      isAuthenticated: true });
},
logout : async () => {
await SecureStore.deleteItemAsync('token');
set({ token: null, user: null, isAuthenticated: false });

}

}));