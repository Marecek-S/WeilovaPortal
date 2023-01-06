import { FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  FadeInUp,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { Shadow } from "react-native-shadow-2";

export default function HomeScreen({ route }) {
  const theme = useTheme();

  //? Pozdrav podle času dne
  return (
    <>
      {/*? Slidein nefunguje */}
      <Animated.Text
        entering={FadeInUp.duration(700).delay(100)}
        style={{
          color: theme.colors.primary,
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Dobré ráno, Marku
      </Animated.Text>

      <Hodina
        id={0}
        theme={theme}
        hodina={{
          nazev: "Programování",
          ucitel: "Ondřej Pacner",
          mistnost: "N308",
          cas: "9:55 - 10:40",
        }}
        title="AKTUALNÍ"
      />
      <Hodina
        id={1}
        theme={theme}
        hodina={{
          nazev: "Elektrotechnika",
          ucitel: "Mgr. Pavel Janýr",
          mistnost: "N312",
          cas: "10:45 - 11:30",
        }}
        title="NADCHÁZEJÍCÍ"
      />
    </>
  );
}

const Hodina = ({ id, theme, hodina, title }) => {
  // když otevřu jeden, druhej se zavře

  //* Old animace
  // const animationHeight = useDerivedValue(() => {
  //   return open == id ? 165 : 0;
  // });
  // const animationStyle = useAnimatedStyle(() => {
  //   return {
  //     height: withTiming(animationHeight.value, { duration: 300 }),
  //   };
  // });

  return (
    <Shadow
      distance={theme.shadowDistance}
      containerStyle={{ marginHorizontal: 15, marginVertical: 10 }}
      style={{ width: "100%" }}
    >
      <Pressable
        android_ripple={{
          borderless: true,
          foreground: true,
        }}
        style={[
          styles.aktualniContainer,
          { backgroundColor: "white", color: "blue" },
        ]}
      >
        <Text
          style={[
            styles.hodinyText,
            {
              fontSize: 25,
              backgroundColor: theme.colors.secondary,
              color: "white",
              borderRadius: 30,
              paddingVertical: 10,
            },
          ]}
        >
          {title}
        </Text>
        <View>
          <View style={{ paddingVertical: 5 }}>
            <Text
              style={[
                styles.hodinyText,
                { fontSize: 25, color: theme.colors.secondary },
              ]}
            >
              {hodina.nazev}
            </Text>
            <Text
              style={[
                styles.hodinyText,
                { fontSize: 20, color: theme.colors.secondary },
              ]}
            >
              {hodina.ucitel}
            </Text>
          </View>
          <View
            style={{
              height: 20,
              width: "100%",
              padding: 3,
              borderRadius: 30,
              borderColor: theme.colors.secondary,
              borderWidth: 2,
            }}
          >
            <View
              style={{
                backgroundColor: theme.colors.secondary,
                width: "65%",
                height: "100%",
                borderRadius: 30,
              }}
            />
          </View>
          <Text
            style={[
              styles.hodinyText,
              { fontSize: 15, color: theme.colors.secondary, marginBottom: 5 },
            ]}
          >
            22m 10s
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <View
              style={[
                styles.hodinyBottomPill,
                {
                  flex: 0.5,
                  borderColor: theme.colors.secondary,
                  borderWidth: 4,
                  marginRight: 15,
                },
              ]}
            >
              <Text
                style={[
                  styles.hodinyText,
                  {
                    fontSize: 25,
                    color: theme.colors.secondary,
                    flex: 1,
                  },
                ]}
              >
                {hodina.mistnost}
              </Text>
            </View>
            <View
              style={[
                styles.hodinyBottomPill,
                {
                  flex: 1,
                  borderColor: theme.colors.secondary,
                  borderWidth: 4,
                },
              ]}
            >
              <Text
                style={[
                  styles.hodinyText,
                  {
                    fontSize: 25,
                    color: theme.colors.secondary,
                  },
                ]}
              >
                {hodina.cas}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </Shadow>
  );
};

const styles = StyleSheet.create({
  aktualniContainer: {
    borderRadius: 30,
    padding: 10,
    color: "white",
    overflow: "hidden",
  },
  hodinyText: {
    textAlign: "center",
    fontWeight: "bold",
  },
  hodinyBottomPill: {
    backgroundColor: "white",
    borderRadius: 30,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
