import { useState } from "react";
import {
  Button,
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Menuicon from "../../assets/svg/menu.svg";
import Usericon from "../../assets/svg/user.svg";

const windowHeight = Dimensions.get("window").height;

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleMenuPress = () => {
    console.log("menu pressed");
    setMenuOpen(!menuOpen);
  };

  const handleProfilePress = () => {
    console.log("profile pressed");
    setProfileOpen(!profileOpen);
  };

  return (
    <View style={styles.header}>
      {/* Left menu */}
      <View
        style={[styles.menu, menuOpen ? styles.menu_open : styles.menu_close]}
      >
        <View style={styles.menu_item} onPress={() => {}} title="Item 1">
          <Text
            style={{
              position: "relative",
              top: 54,
              right: -70,
              fontSize: 25,
              display: "flex",
              color: "white",
            }}
          >
            Domů
          </Text>
          <Text
            style={{
              top: 54,
              right: -70,
              fontSize: 25,
              display: "flex",
              color: "white",
            }}
          >
            Události
          </Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable
          onPress={handleMenuPress}
          style={{ elevation: 50, zIndex: 50 }}
        >
          <Menuicon width={30} height={30} fill="white" />
        </Pressable>

        <View
          style={{
            marginLeft: 50,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            zIndex: 0,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 24,
              textAlign: "center",
              color: "white",
            }}
          >
            SŠAI Weilova
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              textAlign: "center",
              color: "white",
            }}
          >
            Studentský portál
          </Text>
        </View>
      </View>

      {/* Profile menu */}
      <Pressable onPress={handleProfilePress} style={{ position: "relative" }}>
        {/* <Usericon width={30} height={30} fill="white" /> */}
        {profileOpen && (
          <View style={styles.profile_menu}>
            <Text
              style={{
                fontSize: 16,
                color: "white",
                fontWeight: "bold",
                left: 5,
              }}
            >
              Jméno a příjmení
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "white",
                fontWeight: "bold",
                left: 5,
              }}
            >
              Třída
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "white",
                fontWeight: "bold",
                left: 5,
              }}
            >
              Student
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "relative",
    height: 65,
    backgroundColor: "red",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 10,
    alignItems: "center",
    flexDirection: "row",
    zIndex: 5,
  },
  menu: {
    height: 650,
    left: -60,
    top: 0,
    position: "absolute",
    backgroundColor: "blue",
    zIndex: 5,
    overflow: "hidden",
  },
  menu_open: {
    width: 200,
  },
  menu_close: {
    width: 0,
  },
  profile_menu: {
    left: -89,
    borderRadius: 5,
    top: 47,
    width: 140,
    height: 70,
    position: "absolute",
    backgroundColor: "blue",
  },
});
