import { createStackNavigator } from "@react-navigation/stack";
import AllPosts from "../components/AllPosts";
import PostScreen from "../components/Post";

const Stack = createStackNavigator();

export default function HomeScreen({ route }) {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          component={AllPosts}
          name="AllPosts"
          options={{ headerTitleAlign: "center", headerShown: false }}
        />
        <Stack.Screen
          component={PostScreen}
          name="PostScreen"
          options={{ headerTitle: "" }}
        />
      </Stack.Navigator>
    </>
  );
}
