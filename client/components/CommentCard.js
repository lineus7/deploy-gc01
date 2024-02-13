import { Image, StyleSheet, Text, View } from "react-native";

export default CommentCard = ({ item }) => {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        paddingHorizontal: 15,
        paddingLeft: 0,
      }}
    >
      <View>
        <Image
          style={{ width: 40, height: 40, borderRadius: 20, marginLeft: 10 }}
          source={{
            uri: "https://i.pinimg.com/474x/af/80/e2/af80e23deeb127837d30554452546196.jpg",
          }}
        />
      </View>
      <View
        style={{
          backgroundColor: "#f7f7f7",
          flex: 1,
          marginLeft: 8,
          padding: 15,
          borderRadius: 5,
          marginBottom: 20,
        }}
      >
        <Text style={styles.cardTitle}>{item.username}</Text>
        <Text style={styles.cardSubTitle}>Manusia di bumi</Text>
        <Text style={{ marginVertical: 15 }}>{item.content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardSubTitle: {
    fontSize: 12,
    color: "gray",
  },
});
