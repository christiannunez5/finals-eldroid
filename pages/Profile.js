import { SafeAreaView } from "react-native-safe-area-context";
import { Navbar } from "../components/Navbar";
import { Ionicons } from "@expo/vector-icons";
import { View, TouchableOpacity, Image, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants";

export const Profile = ({ route }) => {
    const { id } = route.params;
    const navigate = useNavigation();

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`${API_URL}/${id}`).then((response) => {
            setUser(response.data);
            setIsLoading(false);
        });
    }, [id]);

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

            {isLoading ? (
                <View
                    style={{
                        width: "100%",
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text
                        style={{
                            fontFamily: "monospace",
                            fontSize: 20,
                        }}
                    >
                        Loading..
                    </Text>
                </View>
            ) : (
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
                                ? `${API_URL}/images/${user.image}`
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
                        onPress={() =>
                            navigate.navigate("UpdateUser", { user })
                        }
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
            )}
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
