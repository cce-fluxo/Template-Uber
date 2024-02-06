import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";

const api = axios.create({
  baseURL: "http://app-catadores.herokuapp.com",
  //
  // baseURL: "https://deploy-develop.onrender.com/",
  // baseURL: "https://catadores-teste-pr-37.onrender.com/",
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("@app-catadores:token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// api.interceptors.response.use(
//   response => {
//     return response;
//   },
//   async err => {
//     const originalReq = err.config;
//     if (err.response.status === 401 && err.config && !err.config._retry) {
//       console.log('precisa de refresh');
//       const [refresh_token] = await AsyncStorage.multiGet([
//         '@app-catadores:refresh_token',
//       ]);

//       const apiRefresh = axios.create({
//         baseURL: 'http://app-catadores.herokuapp.com',
//       });

//       try {
//         const response = await apiRefresh.get(`/token/refresh`, {
//           headers: { Authorization: `Bearer ${refresh_token[1]}` },
//         });
//         await AsyncStorage.multiSet([
//           ['@app-catadores:token', response.data.token],
//           ['@app-catadores:refresh_token', response.data.refresh_token],
//         ]);
//         originalReq.headers['Authorization'] = `Bearer ${response.data.token}`;
//       } catch (err) {
//         showMessage({
//           message: 'Por favor, fazer o login novamente!',
//           type: 'info',
//           icon: 'info',
//         });
//       }
//       return axios(originalReq);
//     } else {
//       throw err;
//     }
//   }
// );

export default api;
