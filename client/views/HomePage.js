import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import { useQuery } from "@apollo/client";
import { GET_ALL_POSTS } from "../query/queries";

export default function HomePage({ navigation }) {
  const { loading, error, data } = useQuery(GET_ALL_POSTS);

  return (
    <View style={styles.container}>
      <Navbar />
      <View style={styles.cardContainer}>
        {loading && <ActivityIndicator size={"large"} />}
        {error && <Text>{JSON.stringify(error, null, 2)}</Text>}
        {data && (
          <FlatList
            data={data.getAllPosts}
            renderItem={({ item }) => <Card item={item} />}
            keyExtractor={(item) => item._id}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  cardContainer: {
    flex: 1,
    backgroundColor: "#F9EFDB",
  },
});
