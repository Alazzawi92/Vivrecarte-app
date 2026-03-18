import api from './api';
export const locationService = {
updateLocation: async (latitude, longitude)=> {
const response = await api.put('users/location', { latitude, longitude });
return response.data;
},


getActiveUsers: async () => {
const response = await api.get("/users/active");
return response.data;
},

getActiveUser: async () => {
const response = await api.get("/users/active");
return response.data;
}}

