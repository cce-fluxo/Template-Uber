import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";

import api from "../services/api";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  //const [refresh_token, setRefreshToken] = useState('');
  const [sigInLoading, setSigInLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      setSigInLoading(true);
      const [user, token] = await AsyncStorage.multiGet([
        "@app-catadores:user",
        "@app-catadores:token",
      ]);

      if (token[1] && user[1]) {
        setToken(token[1]);
        setUser(JSON.parse(user[1]));
      }
      setSigInLoading(false);
    }
    loadStorageData();
  }, []);

  const updateUser = useCallback(async (userInfo) => {
    try {
      const jsonValue = JSON.stringify(userInfo);
      await AsyncStorage.setItem("@app-catadores:user", jsonValue);
      setUser(userInfo);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const signIn = useCallback(async (userInfo, password, setLoading) => {
    setLoading(true);
    try {
      let data = {
        email: userInfo,
        password,
      };

      const response = await api.post("/token", data);
      const { token, user, refresh_token } = response.data;

      api.defaults.headers.Authorization = `Bearer ${token}`;

      showMessage({
        message: "Login efetuado com sucesso",
        // description: `Bem vindo, ${user.name}!`,
        type: "success",
        icon: "success",
        duration: 4000,
      });
      await AsyncStorage.multiSet([
        ["@app-catadores:token", token],
        ["@app-catadores:user", JSON.stringify(user)],
        ["@app-catadores:refresh_token", refresh_token],
      ]);
      setUser(user);
      setToken(token);

      //setRefreshToken(refresh_token);
    } catch (err) {
      console.log("aqui context: ", err.response.data);
      if (err.response.data.error === "email not confirmed") {
        showMessage({
          message: "Erro ao entrar no aplicativo",
          description: "Endereço de email não confirmado",
          type: "danger",
          icon: "danger",
        });
      } else {
        showMessage({
          message: "Erro ao entrar no aplicativo",
          description: "Endereço de email ou senha incorretos",
          type: "danger",
          icon: "danger",
        });
      }
    }
    setLoading(false);
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove([
      "@app-catadores:token",
      "@app-catadores:user",
      "@app-catadores:refresh_token",
    ]);
    setToken();
    setUser();

    AsyncStorage.clear().then(() => {
      setUser(null);
    });

    showMessage({
      message: "Logout efetuado com sucesso",
      description: "Até logo!",
      type: "success",
      icon: "success",
      duration: 2000,
    });
  }, []);

  {
    // Refresh Token
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
    //         originalReq.headers[
    //           'Authorization'
    //         ] = `Bearer ${response.data.token}`;
    //       } catch (err) {
    //         signOut();
    //       }
    //       return axios(originalReq);
    //     } else {
    //       throw err;
    //     }
    //   }
    // );
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        signIn,
        signOut,
        setUser,
        updateUser,
        sigInLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
