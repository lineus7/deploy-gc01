import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { POST_REGISTER } from "../query/queries";

export default function RegisterPage({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [registerFunc, { data, loading, error }] = useMutation(POST_REGISTER);

  const handleRegister = async () => {
    try {
      let result = await registerFunc({
        variables: {
          inputRegister: {
            email,
            password,
            username,
            name,
          },
        },
      });
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/582px-LinkedIn_Logo.svg.png",
        }}
        style={styles.image}
      />
      <Text style={styles.hero}>Join LinkedIn</Text>
      <Text style={{ marginTop: 10 }}>
        or{" "}
        <Text
          style={{ color: "#0A66C2", fontWeight: "bold" }}
          onPress={() => navigation.navigate("Login")}
        >
          Sign in
        </Text>
      </Text>
      {error && (
        <Text style={{ marginTop: 10, marginBottom: 0, color: "red" }}>
          {error.message}
        </Text>
      )}
      {loading && <ActivityIndicator />}
      <View style={{ marginTop: 30 }}>
        <TextInput
          style={[styles.input, { marginBottom: 30 }]}
          placeholder="Email"
          onChangeText={setEmail}
        />
        <TextInput
          style={[styles.input, { marginBottom: 30 }]}
          placeholder="Username"
          onChangeText={setUsername}
        />
        <TextInput
          style={[styles.input, { marginBottom: 30 }]}
          placeholder="Name"
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={setPassword}
        />
      </View>

      <Text style={{ fontSize: 10, marginTop: 30 }}>
        By clicking Agree & Join or Continue, you agree to the LinkedIn{" "}
        <Text style={{ color: "#0A66C2", fontWeight: "bold" }}>
          User Agreement
        </Text>
        ,{" "}
        <Text style={{ color: "#0A66C2", fontWeight: "bold" }}>
          Privacy Policy
        </Text>
        , and{" "}
        <Text style={{ color: "#0A66C2", fontWeight: "bold" }}>
          Cookie Policy
        </Text>
        . For phone number signups we will send a verification code via SMS.
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
        onPress={handleRegister}
      >
        <Text
          style={{ textAlign: "center", color: "white", fontWeight: "bold" }}
        >
          Agree & Join
        </Text>
      </Pressable>
    </View>
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
