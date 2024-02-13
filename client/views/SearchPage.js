import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native";
import UserCard from "../components/UserCard";
import SearchNavbar from "../components/SearchNavbar";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_USER_BY_USERNAME } from "../query/queries";

export default SearchPage = ({ route }) => {
  const { input } = route.params;
  const firstQuery = useQuery(GET_USER_BY_USERNAME, {
    variables: { username: input },
  });
  const [fetchData, { loading, data, error }] =
    useLazyQuery(GET_USER_BY_USERNAME);
  return (
    <>
      {/* NavBar */}
      <SearchNavbar fetchData={fetchData} />
      {firstQuery.loading && <ActivityIndicator />}
      {/* NavBar END */}
      {firstQuery.data && (
        <FlatList
          data={firstQuery.data?.getUserByName}
          renderItem={({ item }) => (
            <UserCard username={item.username} userId={item._id} />
          )}
          keyExtractor={(item) => item?._id}
          style={styles.card}
        />
      )}
    </>
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
