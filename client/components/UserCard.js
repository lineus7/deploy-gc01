import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import { GET_USER_BY_ID, POST_ADD_FOLLOW } from "../query/queries";
import { useState } from "react";

export default UserCard = ({ username, userId }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [addFollow, { data, loading, error }] = useMutation(POST_ADD_FOLLOW);

  const handleFollow = async () => {
    try {
      setModalVisible(true);
      const response = await addFollow({ variables: { followingId: userId } });
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigation = () => {
    navigation.navigate("Profile", { userId });
  };

  return (
    <>
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Pressable onPress={handleNavigation}>
            <Image
              style={styles.headerImage}
              source={{
                uri: "https://i.pinimg.com/474x/af/80/e2/af80e23deeb127837d30554452546196.jpg",
              }}
            />
          </Pressable>
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
            <Text style={styles.cardSubTitle}>Banyak Banget</Text>
            <Text style={styles.cardSubTitle}>01-01-2012</Text>
          </View>
          <AntDesign
            name="adduser"
            size={24}
            color="black"
            onPress={handleFollow}
          />
        </View>
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
            {loading && <ActivityIndicator size={"large"} />}
            {data && (
              <Text style={styles.modalText}>Success follow {username}</Text>
            )}
            {error && <Text style={styles.modalText}>{error?.message}</Text>}
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
