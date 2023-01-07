import { useTheme } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { useContext, useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Shadow } from "react-native-shadow-2";
import Loading from "../components/Loading";
import { AuthContext } from "../Context";

import Logo from "../../assets/logo_login.svg";

const width = Dimensions.get("window").width;

export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  const theme = useTheme();

  const { loginCredentials } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert(null, "Vyplňte prosím všechna pole");
      return;
    }
    setIsLoading(true);
    await loginCredentials(username, password)
      .catch((err) => {
        Alert.alert(null, err.message);
      })
      .finally(() => setIsLoading(false));
  };

  //todo: popup s chybou
  if (isLoading) {
    return <Loading />;
  }
  return (
    <View
      style={{
        height: "100%",
        backgroundColor: theme.colors.background,
        alignItems: "center",
      }}
    >
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
              color: theme.colors.primary,
            }}
          >
            PŘIHLÁŠENÍ
          </Text>
          <View
            style={{
              backgroundColor: theme.colors.primary,
              height: 4,
              width: 250,
              borderRadius: 30,
            }}
          />
        </View>
      </SafeAreaView>

      <Logo width={250} height="25%" />
      <Shadow distance={theme.shadowDistance}>
        <TextInput
          placeholderTextColor={theme.colors.gray}
          selectionColor="black"
          autoCorrect={false}
          value={username}
          onChangeText={setUsername}
          onSubmitEditing={() => passwordInputRef.current.focus()}
          returnKeyType="next"
          blurOnSubmit={false}
          style={styles.input}
          placeholder="Uživatelské jméno"
          ref={usernameInputRef}
        />
      </Shadow>
      <Shadow distance={theme.shadowDistance}>
        <TextInput
          placeholderTextColor={theme.colors.gray}
          selectionColor="black"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          onSubmitEditing={handleLogin}
          returnKeyType="done"
          style={styles.input}
          placeholder="Heslo"
          ref={passwordInputRef}
        />
      </Shadow>
      <Pressable
        onPress={handleLogin}
        style={({ pressed }) => [
          {
            paddingVertical: 10,
            paddingHorizontal: 30,
            backgroundColor: theme.colors.primary,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 30,
          },
        ]}
      >
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            letterSpacing: 0.5,
          }}
        >
          Přihlástit se
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    fontFamily: "Montserrat_700Bold",
    backgroundColor: "white",
    width: width * 0.85,
    fontSize: 16,
    height: 60,
    borderRadius: 30,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
});
