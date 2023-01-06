import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Shadow} from "react-native-shadow-2"
import {useTheme} from "@react-navigation/native"

export default function NadchazejiciScreen(){
    return(
        <View>
          
            <Hodina hodina={{
          nazev: "Programování",
          ucitel: "Ondřej Pacner",
          mistnost: "N308",
          cas: "9:55 - 10:40",
        }}
        title="NADCHÁZEJÍCÍ"/>
        <HodinaSmall hodina={{
          nazev: "Programování",
          ucitel: "Ondřej Pacner",
          mistnost: "N308",
          cas: "9:55 - 10:40",
        }}/>
        </View>
    )
}

const Hodina = ({ hodina, title }) => {
    const theme = useTheme()
  
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
          style={
            styles.aktualniContainer
            
          }
        >
          <Text
            style={[
              styles.hodinyText,
              {
                fontSize: 24,
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
                  { fontSize: 24, color: theme.colors.secondary },
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
                      fontSize: 24,
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
                      fontSize: 24,
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

  const HodinaSmall = ({hodina}) => {
    const theme = useTheme()
    return(
        <Shadow distance={theme.shadowDistance}
        containerStyle={{ marginHorizontal: 15, marginVertical: 10 }}
        style={{ width: "100%" }}>
            <Pressable style={[styles.aktualniContainer,{ flexDirection: "row"}]}>
            <View style={{ backgroundColor:theme.colors.secondary, flex:1, justifyContent: "center", alignItems:"center"}}>
            <Text>5</Text></View>
            <View style={{flex:5}}></View>
            <View></View>
            </Pressable>
        </Shadow>
    )
  }


  const styles = StyleSheet.create({
    aktualniContainer: {
      borderRadius: 30,
      padding: 10,
      color: "white",
      overflow: "hidden",
      backgroundColor: "white",
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