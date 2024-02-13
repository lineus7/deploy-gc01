import { View, StyleSheet, Image, TextInput, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { LoginContext } from "../context/LoginContext";
import * as SecureStore from "expo-secure-store";

const Navbar = () => {
  const { setLogin } = useContext(LoginContext);
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  let userId;
  SecureStore.getItemAsync("_id").then((res) => {
    userId = res;
  });

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("_id");
    setLogin(false);
  };

  return (
    <View style={[styles.navBar, { justifyContent: "center" }]}>
      <View style={{ flexDirection: "row" }}>
        <Pressable
          onPress={() => {
            console.log(userId);
            navigation.navigate("Profile", { userId });
          }}
        >
          <Image
            source={{
              uri: "https://i.pinimg.com/474x/af/80/e2/af80e23deeb127837d30554452546196.jpg",
            }}
            style={{
              width: 36,
              height: 36,
              resizeMode: "cover",
              borderRadius: 18,
              marginLeft: 10,
              marginRight: 20,
            }}
          />
        </Pressable>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="black" />
          <TextInput
            style={styles.search}
            placeholder="Search"
            onChangeText={setSearch}
            onSubmitEditing={() => {
              navigation.navigate("Search", { input: search });
            }}
          />
        </View>
        <View style={{ justifyContent: "center", marginLeft: 10 }}>
          <Entypo
            name="log-out"
            size={28}
            color="black"
            style={{ marginLeft: 10, marginRight: 10 }}
            onPress={handleLogout}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    // flex: 1,
    height: 50,
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  searchContainer: {
    height: 36,
    width: 270,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 8,
    backgroundColor: "#e6f3ff",
    borderRadius: 9,
  },
  search: {
    // height: 36,
    // width: 270,
    padding: 8,
    flex: 1,
  },
});

export default Navbar;
