import { useTheme } from "@react-navigation/native";
import {
  useInfiniteQuery,
  useIsFetching,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { Shadow } from "react-native-shadow-2";
import Error from "./Error";
import Loading from "./Loading";

import Search from "../../assets/icons/search.svg";
import Xmark from "../../assets/icons/x_mark.svg";

function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}

export default function Posts({ navigation }) {
  const theme = useTheme();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);

  const {
    data,
    isLoading,
    isRefetching,
    error,
    refetch,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts", debounceSearch],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(
        `https://skolahostivar.cz/wp-json/wp/v2/posts?page=${pageParam}&search=${search}&_embed`
      );
      if (!res.ok) {
        throw new Error("Error");
      }

      const data = await res.json();

      return { totalPages: res.headers.map["x-wp-totalpages"], data };
    },
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length + 1 <= lastPage.totalPages
        ? allPages.length + 1
        : undefined;
    },
  });

  //? Custom hook https://github.com/facebook/react-native/issues/32836

  //nevim už
  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    refetch().then(() => setIsRefreshing(false));
  });

  if (error) {
    return <Error onPress={refetch} />;
  }
  return (
    <>
      <Shadow
        distance={theme.shadowDistance}
        containerStyle={{
          marginVertical: 5,
          marginHorizontal: 15,
        }}
        style={{ width: "100%" }}
      >
        <View style={styles.input}>
          <Search fill={theme.colors.gray} style={{ marginRight: 10 }} />
          <TextInput
            selectionColor="black"
            value={search}
            onChangeText={setSearch}
            placeholder="Hledat..."
            style={{ fontWeight: "bold", flex: 1 }}
          />
          <Pressable onPress={() => setSearch("")} hitSlop={5}>
            <Xmark fill={search ? theme.colors.primary : null} />
          </Pressable>
        </View>
      </Shadow>
      {isLoading || isRefetching ? (
        <Loading />
      ) : (
        <FlatList
          data={data.pages}
          renderItem={({ item }) => (
            <Item item={item} navigation={navigation} theme={theme} />
          )}
          onEndReachedThreshold={0.2}
          refreshControl={
            <RefreshControl
              onRefresh={onRefresh}
              refreshing={isRefreshing}
              colors={[theme.colors.primary]}
              tintColor={theme.colors.primary}
            />
          }
          ListFooterComponent={
            <ActivityIndicator
              color={theme.colors.primary}
              animating={isFetchingNextPage}
              size="large"
              style={{ marginVertical: 10 }}
            />
          }
          onEndReached={() => fetchNextPage()}
        />
      )}
    </>
  );
}

const Item = ({ item, navigation, theme }) => {
  return (
    <>
      {item.data.map((post) => {
        return (
          <Shadow
            distance={theme.shadowDistance}
            containerStyle={{ marginVertical: 10, marginHorizontal: 15 }}
            style={{ width: "100%" }}
            key={post.id}
          >
            <View
              style={{
                borderRadius: 30,
                overflow: "hidden",
              }}
            >
              <Pressable
                onPress={() =>
                  navigation.navigate("PostScreen", {
                    postId: post.id,
                    title: post.title.rendered,
                    content: post.content.rendered,
                  })
                }
                android_ripple={{
                  borderless: true,
                }}
                style={{
                  backgroundColor: "white",
                  borderRadius: 30,
                  padding: 10,
                }}
              >
                <Image
                  style={{
                    width: "100%",
                    height: 100,
                    borderRadius: 30,
                    resizeMode: "cover",
                  }}
                  source={
                    post._embedded.hasOwnProperty("wp:featuredmedia") &&
                    post._embedded["wp:featuredmedia"][0].hasOwnProperty(
                      "source_url"
                    )
                      ? {
                          uri: post._embedded["wp:featuredmedia"][0].source_url,
                        }
                      : require("../../assets/logo.png")
                  }
                />

                <Text
                  style={{
                    paddingTop: 5,
                    fontSize: 20,
                    fontWeight: "bold",
                    textAlign: "center",
                    color: theme.colors.primary,
                    textDecorationLine: "underline",
                  }}
                >
                  {post.title.rendered.replace(/&nbsp;/gi, " ")}
                </Text>
                <Text
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    fontSize: 14,
                    fontWeight: "500",
                  }}
                >
                  {post.excerpt.rendered
                    .replace(/&nbsp;/gi, " ")
                    .replace(/(<([^>]+)>)/gi, "")
                    .trim()}
                </Text>
              </Pressable>
            </View>
          </Shadow>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white",
    fontSize: 16,
    height: 60,
    borderRadius: 30,
    paddingHorizontal: 20,
  },
});
