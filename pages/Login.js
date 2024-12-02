import { TextInput, StyleSheet, View, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import axios from "axios";

export const Login = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState();

    const handleLogin = () => {
        navigation.navigate("Home");
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Navbar />
            <View
                style={{
                    paddingHorizontal: 10,
                    flex: 1,
                    justifyContent: "center",
                }}
            >
                <View
                    style={{
                        paddingVertical: 50,
                        paddingHorizontal: 10,
                        borderColor: "#ccc",
                        borderWidth: 2,
                        borderRadius: 10,
                        gap: 10,
                    }}
                >
                    <TextInput
                        onChangeText={setUsername}
                        style={styles.input}
                        placeholder="Enter username"
                    ></TextInput>

                    <TextInput
                        onChangeText={setPassword}
                        style={styles.input}
                        secureTextEntry
                        placeholder="Enter password"
                    ></TextInput>

                    <Button title="Login" onPress={handleLogin} />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    input: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderColor: "#ccc",
        borderWidth: 2,
        borderRadius: 10,
        fontFamily: "monospace",
        color: "black",
    },
});
