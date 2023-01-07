import { useTheme } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Shadow } from "react-native-shadow-2";

const styles = StyleSheet.create({
  aktualniContainer: {
    borderRadius: 30,
    padding: 10,
    overflow: "hidden",
  },
  hodinyText: {
    textAlign: "center",
  },
  hodinyBottomPill: {
    borderWidth: 3,
    borderRadius: 30,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export const SmallHodina = ({ hodina }) => {
  const theme = useTheme();
  return (
    <Shadow
      distance={theme.shadowDistance}
      containerStyle={{ marginHorizontal: 15, marginVertical: 10 }}
      style={{ width: "100%" }}
    >
      <View style={[styles.aktualniContainer, { flexDirection: "row" }]}>
        <View
          style={{
            backgroundColor: theme.colors.secondary,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>5</Text>
        </View>
        <View style={{ flex: 5 }}></View>
        <View></View>
      </View>
    </Shadow>
  );
};

export const AktualniHodina = ({ hodina }) => {
  const theme = useTheme();

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
      <View
        style={[
          styles.aktualniContainer,
          { backgroundColor: theme.colors.secondary },
        ]}
      >
        <Text
          style={[
            styles.hodinyText,
            {
              marginBottom: 5,
              fontFamily: "Montserrat_700Bold",
              fontSize: 24,
              backgroundColor: "white",
              color: theme.colors.secondary,
              borderRadius: 30,
              paddingVertical: 10,
            },
          ]}
        >
          AKTUÁLNÍ
        </Text>
        <View>
          <View style={{ paddingVertical: 5 }}>
            <Text
              style={[
                styles.hodinyText,
                {
                  fontSize: 24,
                  color: "white",
                  fontFamily: "Montserrat_600SemiBold",
                },
              ]}
            >
              {hodina.nazev}
            </Text>
            <Text
              style={[
                styles.hodinyText,
                {
                  fontSize: 20,
                  color: "white",
                  fontFamily: "Montserrat_500Medium",
                },
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
              borderColor: "white",
              borderWidth: 2,
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                width: "65%",
                height: "100%",
                borderRadius: 30,
              }}
            />
          </View>
          <Text
            style={[
              styles.hodinyText,
              {
                fontSize: 15,
                color: "white",
                marginBottom: 5,
                fontFamily: "Montserrat_700Bold",
              },
            ]}
          >
            22m 10s
          </Text>
          <View
            style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 5 }}
          >
            <View
              style={[
                styles.hodinyBottomPill,
                {
                  flex: 0.5,
                  borderColor: "white",
                  marginRight: 15,
                },
              ]}
            >
              <Text
                style={[
                  styles.hodinyText,
                  {
                    fontSize: 24,
                    color: "white",
                    fontFamily: "Montserrat_700Bold",
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
                  borderColor: "white",
                },
              ]}
            >
              <Text
                style={[
                  styles.hodinyText,
                  {
                    fontSize: 24,
                    color: "white",
                    fontFamily: "Montserrat_700Bold",
                  },
                ]}
              >
                {hodina.cas}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Shadow>
  );
};

export const NadchazejiciHodina = ({ hodina }) => {
  const theme = useTheme();

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
      <View style={[styles.aktualniContainer, { backgroundColor: "white" }]}>
        <Text
          style={[
            styles.hodinyText,
            {
              marginBottom: 5,
              fontFamily: "Montserrat_700Bold",
              fontSize: 24,
              backgroundColor: theme.colors.secondary,
              color: "white",
              borderRadius: 30,
              paddingVertical: 10,
            },
          ]}
        >
          NADCHÁZEJÍCÍ
        </Text>
        <View>
          <View style={{ paddingVertical: 5 }}>
            <Text
              style={[
                styles.hodinyText,
                {
                  fontSize: 24,
                  color: theme.colors.secondary,
                  fontFamily: "Montserrat_600SemiBold",
                },
              ]}
            >
              {hodina.nazev}
            </Text>
            <Text
              style={[
                styles.hodinyText,
                {
                  fontSize: 20,
                  color: theme.colors.secondary,
                  fontFamily: "Montserrat_500Medium",
                },
              ]}
            >
              {hodina.ucitel}
            </Text>
          </View>

          <View
            style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 5 }}
          >
            <View
              style={[
                styles.hodinyBottomPill,
                {
                  flex: 0.5,
                  borderColor: theme.colors.secondary,
                  marginRight: 15,
                },
              ]}
            >
              <Text
                style={[
                  styles.hodinyText,
                  {
                    fontSize: 24,
                    color: theme.colors.secondary,
                    fontFamily: "Montserrat_700Bold",
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
                },
              ]}
            >
              <Text
                style={[
                  styles.hodinyText,
                  {
                    fontSize: 24,
                    color: theme.colors.secondary,
                    fontFamily: "Montserrat_700Bold",
                  },
                ]}
              >
                {hodina.cas}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Shadow>
  );
};
