import { SafeAreaView } from "react-native-safe-area-context";
import { Navbar } from "../components/Navbar";
import { Ionicons } from "@expo/vector-icons";
import { View, TouchableOpacity, Image, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";

export const Profile = ({ route }) => {
    const { user } = route.params;
    const navigate = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Navbar>
                <TouchableOpacity onPress={() => navigate.navigate("Home")}>
                    <Ionicons
                        name="arrow-back-outline"
                        size={24}
                        color="white"
                    />
                </TouchableOpacity>
            </Navbar>

            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    gap: 10,
                    marginTop: 80,
                }}
            >
                <Image
                    style={styles.image}
                    source={{
                        uri: user.image
                            ? user.image
                            : "https://www.w3schools.com/w3images/avatar2.png",
                    }}
                />

                <Text style={{ fontFamily: "monospace", fontSize: 20 }}>
                    {user.email}
                </Text>
                <Text style={{ fontFamily: "monospace", fontSize: 20 }}>
                    {user.password}
                </Text>

                <TouchableOpacity
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingVertical: 15,
                        paddingHorizontal: 15,
                        justifyContent: "center",
                        gap: 10,
                        borderRadius: 10,
                        borderWidth: 1,
                    }}
                    onPress={() => navigate.navigate("UpdateUser", { user })}
                >
                    <Text style={{ fontFamily: "monospace", fontSize: 18 }}>
                        Edit User
                    </Text>

                    <Feather
                        name="edit-2"
                        size={24}
                        color="black"
                        style={{ alignSelf: "flex-end" }}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    image: {
        height: 200,
        width: 200,
        position: "relative",
        borderRadius: 100,
        zIndex: 0,
    },
});
