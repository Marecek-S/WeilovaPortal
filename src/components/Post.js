import { useTheme } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import * as WebBrowser from "expo-web-browser";
import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import RenderHtml from "react-native-render-html";
import Error from "./Error";
import Loading from "./Loading";

export default function PostScreen({ route, navigation }) {
  const { postId, content } = route.params;
  const { width } = useWindowDimensions();
  const theme = useTheme();

  // const { data, isLoading, error, refetch } = useQuery({
  //   queryKey: ["post", postId],
  //   queryFn: async () => {
  //     const res = await fetch(
  //       `https://skolahostivar.cz/wp-json/wp/v2/posts/${postId}?_fields=content.rendered`
  //     );
  //     if (!res.ok) {
  //       throw new Error("Error");
  //     }

  //     return res.json();
  //   },
  // });

  //kopie css z webu
  //todo: opravit
  const tagsStyles = {
    body: { marginHorizontal: 15, marginBottom: 30 },
    h1: { color: theme.colors.primary }, // nechce se mi hledat jak to udělat v jednom řádku, "h1,h2" nejde
    h2: { color: theme.colors.primary },
    h3: { color: theme.colors.primary },
    h4: { color: theme.colors.primary },
    h5: { color: theme.colors.primary },
    h6: { color: theme.colors.primary },
    b: { fontWeight: "bold" },
    p: { margin: 0, lineHeight: 22 },
    blockquote: { margin: 0 },
    table: {
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "#ddd",
    },
    td: { borderTopWidth: 1, borderStyle: "solid", borderColor: "#ddd" },
    img: { marginVertical: 10 },
  };

  //Otevření odkazu v aplikaci
  const renderers = {
    a: {
      onPress(htmlAttribs, href) {
        WebBrowser.openBrowserAsync(href);
      },
    },
  };

  //vyfiltrování []
  const source = {
    html: content.replace(/ *\[[^\]]*]/g, ""),
  }; //? odstranění \ css

  //! obrázky lagujou extrémně
  return (
    <ScrollView>
      <RenderHtml
        renderersProps={renderers}
        tagsStyles={tagsStyles}
        source={source}
        contentWidth={width}
        baseStyle={{
          color: "#052f7f",
        }}
      />
    </ScrollView>
  );
}
