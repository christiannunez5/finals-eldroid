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
import { API_URL } from "../constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";

export const AddUser = ({ route }) => {
    const { user } = route?.params || {};

    const [image, setImage] = useState("");

    const [newUser, setNewUser] = useState({
        email: user ? user.email : "",
        password: user ? user.password : "",
        confirmPassword: user ? user.confirmPassword : "",
    });

    const handleInputChange = (key, value) => {
        setNewUser((prev) => ({ ...prev, [key]: value }));
    };

    const navigate = useNavigation();
    
    const openCamera = async () => {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: "images",
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }

        setUpdatedUser((prev) => ({
            ...prev,
        }));
    };
    const handleSubmit = async () => {
        const error = validateUser(newUser);
        if (error) {
            alert(error);

            return;
        }

        const imageData = {
            uri: newUser.image,
            type: "image/jpeg",
            name: "image.jpg",
        };

        const formData = new FormData();

        formData.append("email", newUser.email);
        formData.append("password", newUser.password);

        if (newUser.image) {
            formData.append("image", imageData);
        }

        axios
            .post(`${API_URL}/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                alert(response.data.message);
                navigate.navigate("Home");
            })
            .catch((error) => {
                if (error instanceof AxiosError) {
                    alert(error.response.data.error);
                }
                console.log(error.message);
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
                <View style={{ position: "relative", zIndex: 0 }}>
                    <Image
                        style={styles.image}
                        source={{
                            uri: image
                                ? image
                                : "https://www.w3schools.com/w3images/avatar2.png",
                        }}
                    />

                    {newUser.image && (
                        <TouchableOpacity
                            onPress={() =>
                                setNewUser((prev) => ({ ...prev, image: "" }))
                            }
                            style={{
                                position: "absolute",
                                right: 10,
                                top: 10,
                                height: 30,
                                width: 30,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 100,
                                backgroundColor: "red",
                            }}
                        >
                            <AntDesign
                                name="close"
                                size={24}
                                color="white"
                                style={{ marginLeft: 1 }}
                            />
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        onPress={openCamera}
                        style={{
                            position: "absolute",
                            bottom: 15,
                            right: 10,
                            zIndex: 300,
                            backgroundColor: "white",
                            padding: 10,
                            borderRadius: 100,
                        }}
                    >
                        <MaterialIcons
                            name="add-a-photo"
                            size={30}
                            color="black"
                        />
                    </TouchableOpacity>
                </View>

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
