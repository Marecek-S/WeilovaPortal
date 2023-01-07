import {
  Montserrat_100Thin,
  Montserrat_200ExtraLight,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
  useFonts,
} from "@expo-google-fonts/montserrat";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useMemo, useReducer, useState } from "react";
import { Alert, Button, Modal, StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import Loading from "./src/components/Loading";
import { AuthContext } from "./src/Context";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import MenuScreen from "./src/screens/MenuScreen";
import NadchazejiciScreen from "./src/screens/NadchazejiciScreen";
import PostScreen from "./src/screens/PostScreen";
import RozvrhScreen from "./src/screens/RozvrhScreen";

import Clock from "./assets/icons/clock.svg";
import Dots from "./assets/icons/dots.svg";
import House from "./assets/icons/house.svg";
import Newspaper from "./assets/icons/newspaper.svg";

//Automaticky neskryje splashscreen
SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();

//Globální barvy aplikace
const Theme = {
  ...DefaultTheme,
  shadowDistance: 3,
  colors: {
    ...DefaultTheme.colors,
    primary: "#db2A3b", //db2b39
    secondary: "#2F7EF4", //27C1F4
    gray: "#BFBFBF",
    background: "#F5F5F5",
  },
};

const queryClient = new QueryClient();

//
function reducer(state, action) {
  switch (action.type) {
    case "setToken":
      return { ...state, token: action.token };
    case "signOut":
      return { token: null, name: null };
    case "setUserInfo":
      return { ...state, userInfo: action.userInfo };
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, {
    token: null,
    userInfo: null,
  });

  //Funkce pro context provider
  //? usememo na všechny kromě state?
  const authContext = {
    loginCredentials: async (username, password) => {
      const res = await fetch("https://znamky.skolahostivar.cz/api/login", {
        method: "POST",
        body: `client_id=ANDR&grant_type=password&username=${username}&password=${password}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (!res.ok) {
        if (res.status === 400) {
          throw new Error("Chybně zadané přihlašovací údaje");
        } else {
          throw new Error("Chyba serveru");
        }
      }

      const data = await res.json();
      const { access_token, token_type, refresh_token } = data;

      if (!access_token) {
        throw new Error("Chyba systému");
      }

      dispatch({ type: "setToken", token: `Bearer ${access_token}` });

      await SecureStore.setItemAsync("refresh_token", refresh_token);
    },

    loginRefresh: async () => {
      const refresh_token = await SecureStore.getItemAsync("refresh_token");

      if (!refresh_token) {
        console.log("Žádný uložený refresh token");
        return;
      }

      const res = await fetch("https://znamky.skolahostivar.cz/api/login", {
        method: "POST",
        body: `client_id=ANDR&grant_type=refresh_token&refresh_token=${refresh_token}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (!res.ok) {
        if (res.status === 400) {
          await SecureStore.deleteItemAsync("refresh_token");
          throw new Error(
            "Vaše přihlášení vypršelo, prosím přihlašte se znovu"
          );
        } else {
          throw new Error("Chyba serveru");
        }
      }

      const data = await res.json();
      const { access_token, token_type, new_refresh_token } = data;

      if (!access_token) {
        throw new Error("Chyba systému");
      }

      dispatch({ type: "setToken", token: `Bearer ${access_token}` });
    },
    signOut: async () => {
      await SecureStore.deleteItemAsync("refresh_token");
      dispatch({ type: "signOut" });
    },
    token: state.token,

    getUser: async () => {
      const res = await fetch("https://znamky.skolahostivar.cz/api/3/user", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          authorization: state.token,
        },
      });

      if (!res.ok) {
        console.log("Chyba serveru při načítání uživatele", res.status);
        return;
      }
      const data = await res.json();

      dispatch({ type: "setUserInfo", userInfo: data });
    },
    userInfo: state.userInfo,
  };

  const [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
  });

  useEffect(() => {
    if (!fontsLoaded) return;
    console.log("Font loaded");
    authContext
      .loginRefresh()
      .then(() => {
        console.log("Uložený token nalezen");
      })
      .catch((err) => {
        Alert.alert(null, err.message);
      })
      .finally(() => {
        SplashScreen.hideAsync();
      });
  }, [fontsLoaded]);

  useEffect(() => {
    if (state.token) {
      authContext.getUser();
    }
  }, [state.token]);

  if (!fontsLoaded) return null;
  if (!state.token) {
    return (
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={Theme}>
          <LoginScreen />
        </NavigationContainer>
      </AuthContext.Provider>
    );
  }
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={Theme}>
          <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
              header: ({ route }) => {
                return (
                  <SafeAreaView>
                    <View
                      style={{
                        marginBottom: 30,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Montserrat_700Bold",
                          padding: 8,
                          fontSize: 28,
                          color: Theme.colors.primary,
                        }}
                      >
                        {route.name.toUpperCase()}
                      </Text>
                      <View
                        style={{
                          backgroundColor: Theme.colors.primary,
                          height: 4,
                          width: 250,
                          borderRadius: 30,
                        }}
                      />
                    </View>
                  </SafeAreaView>
                );
              },
              tabBarActiveTintColor: Theme.colors.primary,
              tabBarInactiveTintColor: Theme.colors.gray,
              tabBarShowLabel: false,
              tabBarStyle: {
                height: 75,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
              },
              headerStyle: {
                backgroundColor: Theme.colors.primary,
              },
              headerTintColor: "white",
            }}
          >
            {/* MENU ITEMS */}
            {/* Nejde dát do komponentu :( */}
            <Tab.Screen
              name="Domů"
              component={HomeScreen}
              options={{
                headerTitle: "",
                tabBarIcon: ({ color }) => {
                  return <House width={35} height={35} fill={color} />;
                },
              }}
            />
            <Tab.Screen
              name="Články"
              component={PostScreen}
              options={{
                unmountOnBlur: true, //reset state při otevření
                tabBarIcon: ({ color }) => {
                  return <Newspaper width={35} height={35} fill={color} />;
                },
              }}
            />
            <Tab.Screen
              name="Rozvrh"
              component={NadchazejiciScreen}
              options={{
                tabBarIcon: ({ color }) => {
                  return <Clock width={35} height={35} fill={color} />;
                },
              }}
            />
            <Tab.Screen
              name="Menu"
              component={MenuScreen}
              options={{
                tabBarIcon: ({ color, size }) => {
                  return <Dots width={35} height={35} fill={color} />;
                },
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}
