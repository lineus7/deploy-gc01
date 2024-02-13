import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PostDetail from "../PostDetailPage";
import HomePage from "../HomePage";
import SearchPage from "../SearchPage";
import ProfilePage from "../ProfilePage";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Post"
        component={HomePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Search"
        component={SearchPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detail Post"
        component={PostDetail}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfilePage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
