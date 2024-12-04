import { SafeAreaView } from "react-native-safe-area-context";
import { Navbar } from "../components/Navbar";
import {
    Image,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { Button } from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { Ionicons } from "@expo/vector-icons";

export const UpdateUser = ({ route }) => {
    const { user } = route.params;

    const navigate = useNavigation();

    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState(user.password);
    const [isSubmitting, setIsSubmitting] = useState(false);

    console.log(user);
    const handleSubmit = () => {
        setIsSubmitting(true);
        const data = {
            email: email,
            password: password,
            image: user.image ? user.image : "",
        };

        const error = validateUser(data);

        if (error) {
            alert(error);
            setIsSubmitting(false);
            return;
        }

        axios
            .post(`http://localhost:8080/update/${user._id}`, data)
            .then((response) => {
                alert(response.data.message);
                setIsSubmitting(false);
                const updatedUser = response.data.data;
                console.log(updatedUser);
                navigate.navigate("Profile", { user: updatedUser });
            })
            .catch((error) => {
                if (error instanceof AxiosError) {
                    alert(error.response.data.error);
                } else {
                    console.error("Unexpected error:", error);
                }
                setIsSubmitting(false);
            });
    };

    const validateUser = ({ email, password }) => {
        if (!email || !password) {
            return "Please fill in all fields.";
        } else if (!isValidEmail(email)) {
            return "Please enter a valid email address.";
        }
        return null;
    };

    console.log("user: ", user);

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Navbar>
                <TouchableOpacity
                    onPress={() => navigate.navigate("Profile", { user })}
                >
                    <Ionicons
                        name="arrow-back-outline"
                        size={24}
                        color="white"
                    />
                </TouchableOpacity>
            </Navbar>

            <View style={styles.form}>
                <TouchableOpacity
                    onPress={() => navigate.navigate("Camera", { user })}
                    style={{ position: "relative", zIndex: 0 }}
                >
                    <Image
                        style={styles.image}
                        source={{
                            uri: user.image
                                ? user.image
                                : "https://www.w3schools.com/w3images/avatar2.png",
                        }}
                    />
                    <MaterialIcons
                        name="add-a-photo"
                        size={30}
                        color="black"
                        style={{
                            position: "absolute",
                            bottom: 15,
                            right: 10,
                            zIndex: 300,
                            backgroundColor: "white",
                            padding: 10,
                            borderRadius: 100,
                        }}
                    />
                </TouchableOpacity>

                <TextInput
                    style={styles.input}
                    placeholder="Enter new email"
                    onChangeText={setEmail}
                    value={email}
                ></TextInput>

                <TextInput
                    style={styles.input}
                    placeholder="Enter new password"
                    secureTextEntry
                    onChangeText={setPassword}
                    value={password}
                ></TextInput>

                <View
                    style={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 5,
                    }}
                >
                    <Button
                        title="Update"
                        style={styles.submit__button}
                        textStyle={{ color: "white" }}
                        onPress={handleSubmit}
                        disabled={isSubmitting}
                    />
                    <Button
                        title="Cancel"
                        style={styles.cancel__button}
                        textStyle={{ color: "white" }}
                        onPress={() => navigate.navigate("Profile", { user })}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    form: {
        flex: 1,
        padding: 20,
        gap: 15,
        alignItems: "center",
    },
    image: {
        height: 200,
        width: 200,
        position: "relative",
        borderRadius: 100,
        zIndex: 0,
    },
    submit__button: {
        padding: 10,
        borderRadius: 8,
        width: "100%",
        backgroundColor: "#4CAF50",
    },
    cancel__button: {
        padding: 10,
        borderRadius: 8,
        backgroundColor: "#F44336",
        width: "100%",
    },

    input: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderColor: "#ccc",
        borderWidth: 2,
        width: "100%",
        borderRadius: 10,
        fontFamily: "monospace",
        color: "black",
    },
});
