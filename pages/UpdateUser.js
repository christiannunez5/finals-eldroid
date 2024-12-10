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
import mime from "mime";

import * as ImagePicker from "expo-image-picker";

export const UpdateUser = ({ route }) => {
    const { user } = route.params;
    const navigate = useNavigation();

    const [image, setImage] = useState(null);

    const [updatedUser, setUpdatedUser] = useState({
        email: user.email,
        password: user.password,
    });

    const renderImage = () => {
        if (image) {
            return image;
        }

        if (!user.image) {
            return "https://www.w3schools.com/w3images/avatar2.png";
        }

        return `${API_URL}/images/${user.image}`;
    };

    const handleInputChange = (key, value) => {
        setUpdatedUser((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async () => {
        const error = validateUser(updatedUser);

        console.log(error);
        if (error) {
            alert(error);
            return;
        }

        const formData = new FormData();

        formData.append("email", updatedUser.email);
        formData.append("password", updatedUser.password);

        const imageData = {
            uri: image,
            type: "image/jpeg",
            name: "image.jpg",
        };

        if (image) {
            const imageData = {
                uri: image,
                type: mime.getType(image), // Dynamically detect image type
                name: "image.jpg",
            };
            formData.append("image", imageData);
        }

        axios
            .patch(`${API_URL}/update/${user._id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                alert(response.data.message);
                navigate.navigate("Profile", { id: user._id });
            })

            .catch((error) => {
                if (error instanceof AxiosError) {
                    if (error.request) {
                        console.log(error.request);
                    }
                    if (error.response) {
                        console.log("error response");
                    }
                    alert(error.response.data);
                } else {
                    console.error("Unexpected error:", error);
                }
            });
    };

    const validateUser = ({ email, password }) => {
        console.log("email: ", email);
        if (!email || !password) {
            return "Please fill in all fields.";
        } else if (!isValidEmail(email)) {
            return "Please enter a valid email address.";
        }
        return null;
    };

    const openCamera = async () => {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: "images",
            allowsEditing: true,
            quality: 0.5,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setUpdatedUser((prev) => ({
                ...prev,
            }));
        } else {
        }
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Navbar>
                <TouchableOpacity
                    onPress={() =>
                        navigate.navigate("Profile", { id: user._id })
                    }
                >
                    <Ionicons
                        name="arrow-back-outline"
                        size={24}
                        color="white"
                    />
                </TouchableOpacity>
            </Navbar>

            <View style={styles.form}>
                <View
                    onPress={() => navigate.navigate("Camera", { user })}
                    style={{ position: "relative", zIndex: 0 }}
                >
                    <Image
                        style={styles.image}
                        source={{
                            uri: image ? image : renderImage(),
                        }}
                    />

                    <TouchableOpacity
                        onPress={openCamera}
                        style={{
                            position: "absolute",
                            bottom: 15,
                            right: 10,
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
                    placeholder="Enter new email"
                    onChangeText={(text) => handleInputChange("email", text)}
                    value={updatedUser.email}
                ></TextInput>

                <TextInput
                    style={styles.input}
                    placeholder="Enter new password"
                    secureTextEntry
                    onChangeText={(text) => handleInputChange("password", text)}
                    value={updatedUser.password}
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
                    />
                    <Button
                        title="Cancel"
                        style={styles.cancel__button}
                        textStyle={{ color: "white" }}
                        onPress={() =>
                            navigate.navigate("Profile", { id: user._id })
                        }
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
