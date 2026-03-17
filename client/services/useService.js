import { api } from "./api";
export const useService = {


//on va mettre a jour la position (location)

update: async (location)=> {
    return api.post("/users/location", { location });
},

//on va reupérer les données de l'utilisateur actuel

getActiveUser: async () => {
const response = await api.get("/users/active");
return response.data;
}}