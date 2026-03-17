import api from '../api';
export const locationService = {
updateLocation: async (latitude, longitude)=> {
const response = await api.put('users/location', { latitude, longitude });
return response.data;
},


};