import { useContext } from "react";
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import { LoginContext } from "./context/LoginContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./views/stack/HomeStack";
import HomePage from "./views/HomePage";
import PostPage from "./views/PostPage";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export const StackHolder = () => {
  const { isLogin, setLogin } = useContext(LoginContext);
  return (
    <>
      {!isLogin && (
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Register" component={RegisterPage} />
        </Stack.Navigator>
      )}
      {isLogin && (
        <Tab.Navigator
          initialRouteName="Home"
          // screenOptions={{ headerShown: false,  }}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "My Network") {
                iconName = focused ? "people" : "people-outline";
              } else if (route.name === "Post") {
                iconName = focused ? "add-circle" : "add-circle-outline";
              } else if (route.name === "Notifications") {
                iconName = focused ? "notifications" : "notifications-outline";
              } else if (route.name === "Jobs") {
                iconName = "bag-sharp";
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#36454F",
            tabBarInactiveTintColor: "#D3D3D3",
            headerShown: false,
          })}
        >
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="My Network" component={HomePage} />
          <Tab.Screen
            name="Post"
            component={PostPage}
            options={{ tabBarStyle: { display: "none" } }}
          />
          <Tab.Screen name="Notifications" component={HomePage} />
          <Tab.Screen name="Jobs" component={HomePage} />
        </Tab.Navigator>
      )}
    </>
  );
};
