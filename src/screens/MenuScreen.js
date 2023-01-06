import { useTheme } from "@react-navigation/native";
import { useContext } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Shadow } from "react-native-shadow-2";
import { AuthContext } from "../Context";

import Gear from "../../assets/icons/gear.svg";
import House from "../../assets/icons/house.svg";
import SignOutIcon from "../../assets/icons/signout.svg";

//MENU//
export default function MenuScreen() {
  const { token, signOut } = useContext(AuthContext);
  const theme = useTheme();

  return (
    <ScrollView style={{ marginTop: 10 }}>
      <MenuItem title="STUDENT" />
      <MenuItem title="DOMÁCÍ ÚKOLY" />
      <MenuItem title="BROŽŮRKA" />
      <MenuItem title="ČLÁNKY" />
      <MenuItem
        title="NASTAVENÍ"
        icon={
          <Gear
            style={{ position: "absolute", right: "85%" }}
            fill={theme.colors.primary}
          />
        }
      />
      <MenuItem
        onPress={() => {
          Alert.alert("Odhlášení", "Opravdu se chcete odhlásit?", [
            {
              text: "Odhlásit se",
              onPress: () => {
                signOut();
              },
            },
            ,
            { text: "Zavřít" },
          ]);
        }}
        title="ODHLÁSIT SE"
        color="white"
        background={theme.colors.primary}
        icon={
          <SignOutIcon
            style={{ position: "absolute", right: "85%" }}
            fill="white"
          />
        }
      />
    </ScrollView>
  );
}

//MENU STYLE//
const MenuItem = ({
  onPress,
  title,
  background = "white",
  color = "#DB2A3B",
  icon = (
    <House style={{ position: "absolute", right: "85%" }} fill="#DB2A3B" />
  ),
}) => {
  return (
    <Shadow
      distance={3}
      containerStyle={{
        marginHorizontal: 40,
        marginBottom: 20,
        marginTop: 5,
      }}
      style={{ width: "100%" }}
    >
      <Pressable
        onPress={onPress}
        style={{
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          backgroundColor: background,
          borderRadius: 30,
          height: 60,
        }}
      >
        {icon}
        <Text
          style={{
            color: color,
            fontWeight: "bold",
            fontSize: 24,
            textAlign: "center",
          }}
        >
          {title}
        </Text>
      </Pressable>
    </Shadow>
  );
};

const style = StyleSheet.create({});
