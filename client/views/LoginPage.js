import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useContext, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { LoginContext } from "../context/LoginContext";
import { useMutation } from "@apollo/client";
import { POST_LOGIN } from "../query/queries";

export default function LoginPage({ navigation }) {
  const { isLogin, setLogin } = useContext(LoginContext);
  const [isChecked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginFunc, { data, loading, error }] = useMutation(POST_LOGIN);

  const handleLogin = async () => {
    try {
      let response = await loginFunc({
        variables: {
          input: {
            email,
            password,
          },
        },
      });
      await SecureStore.setItemAsync("token", response.data.login.token);
      await SecureStore.setItemAsync("_id", response.data.login._id);
      setLogin(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/582px-LinkedIn_Logo.svg.png",
        }}
        style={styles.image}
      />
      <Text style={styles.hero}>Sign in</Text>
      <Text style={{ marginTop: 10 }}>
        or{" "}
        <Text
          style={{ color: "#0A66C2", fontWeight: "bold" }}
          onPress={() => navigation.navigate("Register")}
        >
          Join LinkedIn
        </Text>
      </Text>
      {error && <Text style={{ color: "red" }}>{error.message}</Text>}
      {loading && <ActivityIndicator />}
      <View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={setPassword}
        />
      </View>
      <View
        style={{
          marginTop: 30,
          marginBottom: 30,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => setChecked(!isChecked)}>
          {isChecked ? (
            <Ionicons name="checkbox" size={25} color="#0066FF" />
          ) : (
            <Ionicons name="square-outline" size={25} />
          )}
        </TouchableOpacity>
        <Text style={{ margin: 6 }}>
          Remember me.{" "}
          <Text style={{ color: "#0A66C2", fontWeight: "bold" }}>
            Learn More
          </Text>
        </Text>
      </View>
      <Text style={{ color: "#0A66C2", fontWeight: "bold" }}>
        Forgot Password?
      </Text>
      <Pressable
        style={{
          backgroundColor: "#0A66C2",
          height: 40,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 50,
          marginTop: 15,
        }}
        onPress={handleLogin}
      >
        <Text
          style={{ textAlign: "center", color: "white", fontWeight: "bold" }}
        >
          Continue
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 16,
    paddingRight: 16,
  },
  image: {
    width: 75,
    height: 75,
    resizeMode: "center",
  },
  hero: {
    fontWeight: "bold",
    fontSize: 30,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
  },
});
