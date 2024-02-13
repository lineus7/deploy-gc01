import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  Pressable,
  ActivityIndicator,
  FlatList,
  Modal,
  ActivityIndicatorBase,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import LikeCard from "../components/LikeCard";
import CommentCard from "../components/CommentCard";
import {
  GET_ALL_POSTS,
  GET_POST_DETAIL,
  POST_ADD_COMMENT,
  POST_ADD_LIKE,
} from "../query/queries";
import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";

const PostDetail = ({ navigation, route }) => {
  const { id } = route.params;
  const { loading, data, error } = useQuery(GET_POST_DETAIL, {
    variables: { postId: id },
  });
  const [addComment] = useMutation(POST_ADD_COMMENT, {
    refetchQueries: [GET_ALL_POSTS, GET_POST_DETAIL],
  });
  const [addLike, likeMutation] = useMutation(POST_ADD_LIKE, {
    refetchQueries: [GET_POST_DETAIL],
  });

  const [textInput, setTextInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalError, setModalError] = useState(false);

  const handleComment = async () => {
    try {
      await addComment({
        variables: {
          postId: id,
          input: {
            content: textInput,
          },
        },
      });
      setModalVisible(true);
      setTextInput("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {loading && <ActivityIndicator size={"large"} />}
      {error && <Text>Ada Error</Text>}
      {data && (
        <>
          <ScrollView style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Image
                  style={styles.headerImage}
                  source={{
                    uri: "https://i.pinimg.com/474x/af/80/e2/af80e23deeb127837d30554452546196.jpg",
                  }}
                />
                <View style={{ marginHorizontal: 6 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: 310,
                      marginRight: 10,
                    }}
                  >
                    <Text style={styles.cardTitle}>
                      {data.getPostById.author.username}
                    </Text>
                  </View>
                  <Text style={styles.cardSubTitle}>Capek ngoding</Text>
                  <Text style={styles.cardSubTitle}>01-01-2012</Text>
                </View>
              </View>
            </View>
            <View style={styles.cardBody}>
              <Text>{data.getPostById.content}</Text>
            </View>
            <Image
              style={styles.imageBody}
              source={{
                uri: data.getPostById.imgUrl,
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
                {!likeMutation.loading ? (
                  <Text>{data.getPostById.likes.length}</Text>
                ) : (
                  <ActivityIndicator size={"small"} />
                )}
              </View>
              <View style={{ marginRight: 10 }}>
                <Text>{data.getPostById.comments.length} comments</Text>
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
                      await addLike({ variables: { postId: id } });
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
                  onPress={() => navigation.navigate("Detail Post")}
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
            <Text style={styles.text}>Reactions</Text>
            <FlatList
              horizontal
              style={{ height: 40, paddingHorizontal: 10 }}
              data={data.getPostById.likes}
              renderItem={({ item }) => <LikeCard username={item.username} />}
            />
            <Text style={styles.text}>Comments</Text>
            {data.getPostById.comments.map((item, index) => {
              return <CommentCard item={item} key={index} />;
            })}
          </ScrollView>
          <View
            style={{
              height: 50,
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              justifyContent: "space-between",
              paddingRight: 15,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  marginHorizontal: 10,
                }}
                source={{
                  uri: "https://i.pinimg.com/474x/af/80/e2/af80e23deeb127837d30554452546196.jpg",
                }}
              />
              <View
                style={{
                  justifyContent: "center",
                  width: 275,
                }}
              >
                <TextInput
                  value={textInput}
                  style={{ overflow: "scroll" }}
                  placeholder="Leave your thoughts here..."
                  onChangeText={setTextInput}
                />
              </View>
            </View>
            <Pressable onPress={handleComment}>
              <Text>Post</Text>
            </Pressable>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Comment Has Been Added</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
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
                <Text style={styles.modalText}>
                  {likeMutation.error?.message}
                </Text>
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
      )}
    </>
  );
};

const styles = StyleSheet.create({
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
  text: {
    marginHorizontal: 10,
    fontSize: 18,
    marginTop: 15,
    marginBottom: 10,
  },
});

export default PostDetail;
