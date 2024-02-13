import { Image, StyleSheet, Text, View } from "react-native";

export default FollowCard = ({ username }) => {
  return (
    <>
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Image
            style={styles.headerImage}
            source={{
              uri: "https://i.pinimg.com/474x/af/80/e2/af80e23deeb127837d30554452546196.jpg",
            }}
          />
          <View style={{ marginHorizontal: 6, width: "70%" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: 310,
                marginRight: 10,
              }}
            >
              <Text style={styles.cardTitle}>{username}</Text>
            </View>
            <Text style={styles.cardSubTitle}>Manusia Biasa</Text>
            <Text style={styles.cardSubTitle}>01-01-2012</Text>
          </View>
        </View>
      </View>
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
