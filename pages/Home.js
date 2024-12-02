import { SafeAreaView } from "react-native-safe-area-context";
import {
    View,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
} from "react-native";
import { Navbar } from "../components/Navbar";
import { UserItem } from "../components/UserItem";
import { Ionicons } from "@expo/vector-icons";

export const Home = () => {
    const users = [
        {
            email: "user1@example.com",
            password: "password123",
            image: "https://www.w3schools.com/w3images/avatar2.png",
        },
        {
            email: "user2@example.com",
            password: "password456",
            image: "https://www.w3schools.com/w3images/avatar2.png",
        },
        {
            email: "user3@example.com",
            password: "password789",
            image: "https://www.w3schools.com/w3images/avatar2.png",
        },
        {
            email: "user4@example.com",
            password: "password000",
            image: "https://www.w3schools.com/w3images/avatar2.png",
        },
        {
            email: "user5@example.com",
            password: "passwordabc",
            image: "https://www.w3schools.com/w3images/avatar2.png",
        },
    ];

    const handleSearchChange = (text) => {};
    return (
        <SafeAreaView style={styles.container}>
            <Navbar isHome />

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
                    <FlatList
                        data={users}
                        renderItem={({ item }) => <UserItem item={item} />}
                    />
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
