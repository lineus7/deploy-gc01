import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { ApolloProvider } from "@apollo/client";
import { LoginProvider } from "./context/LoginContext";
import { StackHolder } from "./StackHolder";
import { client } from "./config/apollo";
import { ProfileProvider } from "./context/ProfileContext";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <NavigationContainer>
          <SafeAreaView style={{ flex: 1 }}>
            <LoginProvider>
              <ProfileProvider>
                <StackHolder />
              </ProfileProvider>
            </LoginProvider>
          </SafeAreaView>
        </NavigationContainer>
      </SafeAreaProvider>
    </ApolloProvider>
  );
}
