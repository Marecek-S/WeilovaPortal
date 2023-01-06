import { useQuery } from "@tanstack/react-query";
import { useCallback, useContext, useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AuthContext } from "../Context";
import Loading from "./Loading";

export default function Rozvrh() {
  const { token } = useContext(AuthContext);
  const { data, refetch, isLoading, isRefetching } = useQuery(
    ["rozvrh"],
    async () => {
      console.log(AuthContext.token);
      const res = await fetch(
        "https://znamky.skolahostivar.cz/api/3/timetable/actual?date=2022-12-01",
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            authorization: token,
          },
        }
      );
      if (!res.ok) {
        throw new Error("Error");
      }
      return res.json();
    }
  );
  // console.log(data);

  const [maxHour, setMaxHour] = useState(0);

  useEffect(() => {
    if (!data) return;
    let max = 0;
    data.Days.forEach((day) => {
      // console.log(day.Atoms[day.Atoms.length - 1].HourId);
      if (day.Atoms[day.Atoms.length - 1].HourId > max) {
        max = day.Atoms[day.Atoms.length - 1].HourId;
      }
    });
    setMaxHour(max);
  }, [data]);

  function getSubject(id) {
    return data.Subjects.find((x) => x.Id == id);
  }

  //convert id do jmena

  if (isLoading || isRefetching) {
    return <Loading />;
  }
  return (
    <>
      <View style={{ flexDirection: "row" }}>
        <View style={[styles.hodinaContainer, { height: "15%" }]}>
          <Text>0</Text>
        </View>
        <ScrollView horizontal={true}>
          <View>
            {data &&
              data.Days.map((day, i) => {
                return (
                  <View style={styles.dayContainer}>
                    {Array.from({ length: maxHour }).map((item, i) => {
                      const hour = day.Atoms.find((x) => x.HourId == i + 2); //? Hodina 0 má id 2 v api
                      return (
                        <View style={styles.hodinaContainer}>
                          <Text>{getSubject(hour?.SubjectId)?.Abbrev}</Text>
                        </View>
                      );
                    })}
                  </View>
                );
              })}
          </View>
        </ScrollView>
      </View>
      <Text>{data.Days.length}</Text>
      <Text>{maxHour}</Text>
      <Button title="refetch"onPress={refetch}></Button>
    </>
  );
}

const styles = StyleSheet.create({
  dayContainer: {
    alignSelf: "flex-start",
    flexDirection: "row",
    backgroundColor: "#72b6f2",
    color: "white",
    height: "17%",
  },
  hodinaContainer: {
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderColor: "black",
    borderWidth: 1,
    padding: 5,
  },
});
