import { StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export default SearchNavBar = ({ fetchData }) => {
  const navigation = useNavigation();
  const [searchNavBar, setSearchNavbar] = useState("");
  return (
    <View style={[styles.navBar, { justifyContent: "center" }]}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <AntDesign
          name="arrowleft"
          size={24}
          color="black"
          style={{ marginLeft: 10, marginRight: 20 }}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="black" />
          <TextInput
            style={styles.search}
            placeholder="Search"
            onChangeText={setSearchNavbar}
            onSubmitEditing={() => {
              // fetchData({ variables: { username: searchNavBar } });
              navigation.navigate("Search", { input: searchNavBar });
            }}
          />
        </View>
        <Ionicons
          name="chatbox-ellipses"
          size={36}
          color="black"
          style={{ marginLeft: 10, marginRight: 10 }}
        />
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
  card: {
    borderRadius: 6,
    backgroundColor: "#fff",
    marginBottom: 8,
  },
  cardContent: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  cardHeader: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    height: 50,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardSubTitle: {
    fontSize: 12,
    color: "gray",
  },
  headerImage: {
    height: "100%",
    aspectRatio: 1,
    resizeMode: "cover",
    borderRadius: 50,
    marginRight: 10,
  },
  text: {
    marginHorizontal: 10,
    fontSize: 18,
    marginTop: 15,
    marginBottom: 10,
  },
});
