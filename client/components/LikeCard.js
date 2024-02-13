import { Image, StyleSheet, Text, View } from "react-native";
import { Foundation } from "@expo/vector-icons";

export default LikeCard = ({ username }) => {
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          position: "relative",
          marginLeft: 10,
        }}
      >
        <Image
          style={[styles.headerImage, { marginRight: 0 }]}
          source={{
            uri: "https://i.pinimg.com/474x/af/80/e2/af80e23deeb127837d30554452546196.jpg",
          }}
        />
        <Foundation
          style={{
            margin: 10,
            position: "absolute",
            right: -10,
            bottom: -15,
          }}
          name="like"
          size={24}
          color="#6592c9"
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerImage: {
    height: "100%",
    aspectRatio: 1,
    resizeMode: "cover",
    borderRadius: 50,
    marginRight: 10,
  },
});
