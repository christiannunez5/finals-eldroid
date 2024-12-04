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

export const AddUser = ({ route }) => {
    const { user } = route?.params || {};

    const [newUser, setNewUser] = useState({
        email: user ? user.email : "",
        password: user ? user.password : "",
        confirmPassword: user ? user.confirmPassword : "",
        image: user ? user.image : "",
    });

    const handleInputChange = (key, value) => {
        setNewUser((prev) => ({ ...prev, [key]: value }));
    };

    const navigate = useNavigation();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = () => {
        setIsSubmitting(true);

        const error = validateUser(newUser);
        if (error) {
            alert(error);
            setIsSubmitting(false);
            return;
        }
        
        axios
            .post("https://finals-eldroid-server.vercel.app/register", newUser)
            .then((response) => {
                alert(response.data.message);
                setIsSubmitting(false);
                navigate.navigate("Home");
            })
            .catch((error) => {
                setIsSubmitting(false);
                if (error instanceof AxiosError) {
                    console.log(error.response.data);
                    // alert(error.response.data.error);
                }
            });
    };

    const validateUser = ({ email, password, confirmPassword }) => {
        if (!email || !password || !confirmPassword) {
            return "Please fill in all fields.";
        }
        if (password !== confirmPassword) {
            return "Passwords do not match.";
        }
        if (!isValidEmail(email)) {
            return "Please enter a valid email address.";
        }
        return null;
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Navbar>
                <TouchableOpacity onPress={() => navigate.navigate("Home")}>
                    <Ionicons
                        name="arrow-back-outline"
                        size={24}
                        color="white"
                    />
                </TouchableOpacity>
            </Navbar>

            <View style={styles.form}>
                <TouchableOpacity
                    onPress={() =>
                        navigate.navigate("Camera", { user: newUser })
                    }
                    style={{ position: "relative", zIndex: 0 }}
                >
                    <Image
                        style={styles.image}
                        source={{
                            uri: newUser.image
                                ? `data:image/jpeg;base64,${newUser.image}`
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
                    placeholder="Enter email"
                    onChangeText={(text) => handleInputChange("email", text)}
                    value={newUser.email}
                ></TextInput>

                <TextInput
                    style={styles.input}
                    placeholder="Enter password"
                    secureTextEntry
                    value={newUser.password}
                    onChangeText={(text) => handleInputChange("password", text)}
                ></TextInput>

                <TextInput
                    style={styles.input}
                    secureTextEntry
                    value={newUser.confirmPassword}
                    placeholder="Enter confirm password"
                    onChangeText={(text) =>
                        handleInputChange("confirmPassword", text)
                    }
                ></TextInput>

                <View
                    style={{
                        flexDirection: "row",
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 5,
                    }}
                >
                    <Button
                        title="Save"
                        style={styles.submit__button}
                        textStyle={{ color: "white" }}
                        onPress={handleSubmit}
                        disabled={isSubmitting}
                    />
                    <Button
                        title="Cancel"
                        style={styles.cancel__button}
                        textStyle={{ color: "white" }}
                        onPress={() => navigate.navigate("Home")}
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
        width: "50%",
        backgroundColor: "#4CAF50",
    },
    cancel__button: {
        padding: 10,
        borderRadius: 8,
        backgroundColor: "#F44336",
        width: "50%",
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
