import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

export default function Error({ onPress }) {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Pressable hitSlop={5} onPress={onPress}>
        <MaterialCommunityIcons
          name="reload"
          size={36}
          color={colors.primary}
        />
      </Pressable>
      <Text style={{ color: colors.primary }}>
        Nepodařilo se načíst informace, zkuste to později...
      </Text>
    </View>
  );
}
