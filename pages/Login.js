import { TextInput, StyleSheet, View, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import axios, { AxiosError } from "axios";

export const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLogin = () => {
        // setIsSubmitting(true);

        // axios
        //     .post("https://finals-eldroid-server.vercel.app/login", {
        //         email: email,
        //         password: password,
        //     })
        //     .then((response) => {
        //         console.log(response.data);
        //         setIsSubmitting(false);
        //         navigation.navigate("Home");
        //     })
        //     .catch((error) => {
        //         if (error instanceof AxiosError) {
        //             alert(error.response.data.error);
        //         }
        //         setIsSubmitting(false);

        //
        //     });

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
                        onChangeText={setEmail}
                        style={styles.input}
                        placeholder="Enter email"
                    ></TextInput>

                    <TextInput
                        onChangeText={setPassword}
                        style={styles.input}
                        secureTextEntry
                        placeholder="Enter password"
                    ></TextInput>

                    <Button
                        title="Login"
                        onPress={handleLogin}
                        disabled={isSubmitting}
                    />
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
