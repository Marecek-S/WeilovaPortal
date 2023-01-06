import { useTheme } from "@react-navigation/native";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

export default function Loading() {
  const { colors } = useTheme();
  return (
    <View style={{  justifyContent: "center", height:"100%" }}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}
