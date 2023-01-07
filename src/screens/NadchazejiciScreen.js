import { useTheme } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { NadchazejiciHodina, SmallHodina } from "../components/RozvrhPills";

export default function NadchazejiciScreen() {
  return (
    <>
      <NadchazejiciHodina
        hodina={{
          nazev: "Programování",
          ucitel: "Ondřej Pacner",
          mistnost: "N308",
          cas: "9:55 - 10:40",
        }}
      />
      <SmallHodina
        hodina={{
          nazev: "Programování",
          ucitel: "Ondřej Pacner",
          mistnost: "N308",
          cas: "9:55 - 10:40",
        }}
      />
    </>
  );
}
