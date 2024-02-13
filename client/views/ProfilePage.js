import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import SearchNavbar from "../components/SearchNavbar";
import FollowCard from "../components/FollowCard";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../query/queries";

export default ProfilePage = ({ route }) => {
  const { userId } = route.params;
  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { userId },
  });
  return (
    <>
      {error && <Text>{JSON.stringify(error, null, 2)}</Text>}
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <SearchNavbar />
        {loading && <ActivityIndicator />}
        {data && (
          <ScrollView>
            <View
              style={{
                height: 150,
                justifyContent: "center",
                position: "relative",
              }}
            >
              <View style={{ backgroundColor: "#d9dadb", height: "50%" }}>
                <Image
                  style={{ height: "100%" }}
                  source={{
                    uri: "https://images.pexels.com/photos/2088203/pexels-photo-2088203.jpeg?auto=compress&cs=tinysrgb&w=800",
                  }}
                />
              </View>
              <View style={{ backgroundColor: "white", height: "50%" }}></View>
              <Image
                source={{
                  uri: "https://i.pinimg.com/474x/af/80/e2/af80e23deeb127837d30554452546196.jpg",
                }}
                style={{
                  height: "80%",
                  aspectRatio: 1,
                  resizeMode: "cover",
                  borderRadius: 200,
                  marginLeft: 10,
                  marginRight: 20,
                  position: "absolute",
                }}
              />
            </View>
            <Text style={{ fontSize: 28, fontWeight: "bold", marginLeft: 10 }}>
              {data.getUserById?.username}
            </Text>
            <Text style={{ fontSize: 16, marginLeft: 10, marginVertical: 8 }}>
              Manusia Biasa
            </Text>
            <Text style={{ marginLeft: 10 }}>Hacktiv8</Text>
            <Text style={{ marginLeft: 10, color: "grey" }}>
              Tangerang, Banten, Indonesia
            </Text>
            <Text
              style={{
                marginLeft: 10,
                fontSize: 14,
                color: "grey",
                marginVertical: 15,
              }}
            >
              {data.getUserById?.follower.length} followers,{" "}
              {data.getUserById?.following.length} following
            </Text>
            <Text style={{ fontSize: 28, marginLeft: 10 }}>Followers</Text>
            {data.getUserById?.follower.map((item, index) => {
              return <FollowCard key={index} username={item.username} />;
            })}
            <Text
              style={{
                fontSize: 28,
                marginLeft: 10,
                marginVertical: 10,
              }}
            >
              Followings
            </Text>
            {data.getUserById?.following.map((item, index) => {
              return <FollowCard username={item.username} key={index} />;
            })}
          </ScrollView>
        )}
      </View>
    </>
  );
};
