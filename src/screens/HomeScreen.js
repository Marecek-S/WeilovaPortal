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
import { AktualniHodina, NadchazejiciHodina } from "../components/RozvrhPills";

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
          textAlign: "center",
          fontFamily: "Montserrat_600SemiBold",
        }}
      >
        Dobré ráno, Marku
      </Animated.Text>

      <AktualniHodina
        hodina={{
          nazev: "Programování",
          ucitel: "Ondřej Pacner",
          mistnost: "N308",
          cas: "9:55 - 10:40",
        }}
      />
      <NadchazejiciHodina
        hodina={{
          nazev: "Elektrotechnika",
          ucitel: "Mgr. Pavel Janýr",
          mistnost: "N312",
          cas: "10:45 - 11:30",
        }}
      />
    </>
  );
}
