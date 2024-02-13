import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useMutation } from "@apollo/client";
import { GET_ALL_POSTS, POST_ADD_LIKE } from "../query/queries";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const Card = ({ item }) => {
  const navigation = useNavigation();
  const [addLike, { loading, error }] = useMutation(POST_ADD_LIKE, {
    refetchQueries: [GET_ALL_POSTS],
  });
  const [modalError, setModalError] = useState(false);

  return (
    <>
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Pressable
              onPress={() => {
                console.log(item.author._id);
                navigation.navigate("Profile", { userId: item.author._id });
              }}
            >
              <Image
                style={styles.headerImage}
                source={{
                  uri: "https://i.pinimg.com/474x/af/80/e2/af80e23deeb127837d30554452546196.jpg",
                }}
              />
            </Pressable>
            <View style={{ marginHorizontal: 6 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: 310,
                  marginRight: 10,
                }}
              >
                <Text style={styles.cardTitle}>{item.author.username}</Text>
                <View style={{ flexDirection: "row" }}>
                  <MaterialCommunityIcons
                    name="dots-vertical"
                    size={24}
                    color="black"
                  />
                  <Ionicons
                    name="close-sharp"
                    size={24}
                    color="black"
                    style={{ marginLeft: 20 }}
                  />
                </View>
              </View>
              <Text style={styles.cardSubTitle}>Capek Ngoding</Text>
              <Text style={styles.cardSubTitle}>01-01-2012</Text>
            </View>
          </View>
        </View>
        <View style={styles.cardBody}>
          <Text>{item.content}</Text>
        </View>
        <Image
          style={styles.imageBody}
          source={{
            uri: item.imgUrl,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Foundation
              style={{ margin: 10 }}
              name="like"
              size={24}
              color="#6592c9"
            />
            {!loading ? (
              <Text>{item.likes.length}</Text>
            ) : (
              <ActivityIndicator size={"small"} />
            )}
          </View>
          <View style={{ marginRight: 10 }}>
            <Text>{item.comments.length} comments</Text>
          </View>
        </View>
        <View style={styles.cardFooter}>
          <View style={styles.footerIcon}>
            <AntDesign
              name="like2"
              size={20}
              color="black"
              onPress={async () => {
                try {
                  await addLike({ variables: { postId: item._id } });
                } catch (error) {
                  console.log(error);
                  setModalError(true);
                }
              }}
            />
            <Text>Like</Text>
          </View>
          <View style={styles.footerIcon}>
            <MaterialCommunityIcons
              name="comment-text-outline"
              size={20}
              color="black"
              onPress={() => {
                navigation.navigate("Detail Post", { id: item._id });
              }}
            />
            <Text>Comment</Text>
          </View>
          <View style={styles.footerIcon}>
            <Entypo name="cycle" size={20} color="black" />
            <Text>Repost</Text>
          </View>
          <View style={styles.footerIcon}>
            <FontAwesome name="send" size={20} color="black" />
            <Text>Send</Text>
          </View>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalError}
        onRequestClose={() => {
          setModalError(!modalError);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{error?.message}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalError(!modalError)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginVertical: 6,
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
  cardBody: {
    margin: 10,
  },
  imageBody: {
    width: "100%",
    aspectRatio: 1,
    resizeMode: "cover",
  },
  cardFooter: {
    margin: 10,
    marginVertical: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    height: 50,
  },
  footerIcon: {
    marginVertical: 8,
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Card;
