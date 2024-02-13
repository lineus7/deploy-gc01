import {
  Image,
  Text,
  StyleSheet,
  View,
  Pressable,
  TextInput,
  ActivityIndicator,
  Modal,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { useMutation } from "@apollo/client";
import { GET_ALL_POSTS, POST_NEW_POST } from "../query/queries";

export default function PostPage({ navigation }) {
  const [textInput, setTextInput] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [addPost, { data, loading, error }] = useMutation(POST_NEW_POST, {
    refetchQueries: [GET_ALL_POSTS],
  });

  const handleAddPost = async () => {
    try {
      await addPost({
        variables: {
          input: {
            content: textInput,
            imgUrl,
            tags: ["Capek"],
          },
        },
      });
      setImgUrl("");
      setTextInput("");
      navigation.goBack();
    } catch (error) {
      setModalVisible(true);
      console.log(error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.navBar}>
          <View
            style={{
              paddingHorizontal: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <AntDesign
                name="close"
                size={24}
                color="black"
                onPress={() => navigation.goBack()}
              />
              <Image
                source={{
                  uri: "https://i.pinimg.com/474x/af/80/e2/af80e23deeb127837d30554452546196.jpg",
                }}
                style={styles.imageNavBar}
              />
              <Text style={{ fontWeight: 600, color: "grey", fontSize: 18 }}>
                Anyone
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <FontAwesome5 name="clock" size={24} color="black" />
              {textInput ? (
                <Pressable
                  style={{
                    backgroundColor: "#0A66C2",
                    width: 50,
                    marginLeft: 30,
                    height: 30,
                    justifyContent: "center",
                    borderRadius: 40,
                  }}
                  onPress={handleAddPost}
                >
                  <Text style={{ textAlign: "center", color: "white" }}>
                    Post
                  </Text>
                </Pressable>
              ) : (
                <Pressable
                  style={{
                    backgroundColor: "#e3e6e4",
                    width: 50,
                    marginLeft: 30,
                    height: 30,
                    justifyContent: "center",
                    borderRadius: 40,
                  }}
                  disabled
                >
                  <Text style={{ textAlign: "center", color: "#939694" }}>
                    Post
                  </Text>
                </Pressable>
              )}
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <TextInput
            style={{
              paddingHorizontal: 10,
              fontSize: 18,
            }}
            value={textInput}
            placeholder="What do you want to talk about?"
            multiline
            onChangeText={(args) => {
              setTextInput(args);
            }}
          />
          {loading && <ActivityIndicator size={"large"} />}
          <View
            style={{
              height: 50,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 10,
            }}
          >
            <FontAwesome6
              name="image"
              size={24}
              color="black"
              style={{ marginRight: 10 }}
            />
            <TextInput
              style={{
                paddingHorizontal: 10,
                fontSize: 18,
              }}
              value={imgUrl}
              onChangeText={setImgUrl}
              placeholder="Type Image Url Here"
            />
          </View>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{error?.message}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

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
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  navBar: {
    height: 50,
    justifyContent: "center",
    marginBottom: 8,
  },
  imageNavBar: {
    width: 36,
    height: 36,
    resizeMode: "cover",
    borderRadius: 18,
    marginLeft: 10,
    marginRight: 20,
  },
});
