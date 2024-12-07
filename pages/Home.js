import { SafeAreaView } from "react-native-safe-area-context";
import {
    View,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Text,
} from "react-native";
import { Navbar } from "../components/Navbar";
import { UserItem } from "../components/UserItem";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "../constants";

export const Home = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigation();

    useEffect(() => {
        axios
            .get(API_URL)
            .then((response) => {
                setUsers(response.data);
                setFilteredUsers(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
            });
    }, []);

    const handleSearchChange = (text) => {
        setFilteredUsers(
            users.filter((user) =>
                user.email.toLowerCase().includes(text.toLowerCase())
            )
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Navbar isHome>
                <TouchableOpacity onPress={() => navigate.navigate("Login")}>
                    <Ionicons
                        name="arrow-back-outline"
                        size={24}
                        color="white"
                    />
                </TouchableOpacity>
            </Navbar>

            <View style={{ padding: 15, flex: 1, gap: 10 }}>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        backgroundColor: "white",
                        alignItems: "center",
                        padding: 10,

                        borderRadius: 10,
                    }}
                >
                    <TextInput
                        style={{
                            paddingHorizontal: 10,
                            paddingVertical: 10,
                            width: "280",
                            fontFamily: "monospace",
                        }}
                        onChangeText={handleSearchChange}
                    />
                    <TouchableOpacity onPress={handleSearchChange}>
                        <Ionicons name="search" size={25} />
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        flex: 1,
                        backgroundColor: "white",
                        padding: 15,
                        borderRadius: 15,
                    }}
                >
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
                        <FlatList
                            data={filteredUsers}
                            renderItem={({ item }) => (
                                <UserItem
                                    item={item}
                                    onPress={() =>
                                        navigate.navigate("Profile", {
                                            id: item._id,
                                        })
                                    }
                                />
                            )}
                        />
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ecf0f1",
    },
});
