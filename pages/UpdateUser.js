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
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { Ionicons } from "@expo/vector-icons";
import { API_URL } from "../constants";
import AntDesign from "@expo/vector-icons/AntDesign";

export const UpdateUser = ({ route }) => {
    const { user } = route.params;
    const [userImage, setUserImage] = useState(user.image);

    const navigate = useNavigation();

    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState(user.password);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const image = () => {
        if (userImage.includes("file://")) {
            return userImage;
        }

        return `${API_URL}/images/${userImage}`;
    };

    console.log("user image:", userImage);
    const handleSubmit = async () => {
        setIsSubmitting(true);

        console.log("submitted!");

        const data = {
            email: email,
            password: password,
        };
        const error = validateUser(data);

        if (error) {
            alert(error);
            setIsSubmitting(false);
            return;
        }

        const formData = new FormData();

        formData.append("email", email);
        formData.append("password", password);

        if (!userImage) {
            console.log("No image, removing profile picture");
            formData.append("removeImage", "true");
        } else if (userImage.includes("file://")) {
            console.log("Uploading new image");
            formData.append("image", {
                uri: userImage,
                type: "image/jpeg",
                name: "image.jpg",
            });
        } else {
            console.log("Keeping existing image");
        }

        setIsSubmitting(false);
        console.log("step 2");
        axios
            .post(`${API_URL}/update/${user._id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                alert(response.data.message);
                setIsSubmitting(false);
                const updatedUser = response.data.data;
                navigate.navigate("Profile", { id: updatedUser._id });
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
                    {userImage && (
                        <TouchableOpacity
                            onPress={() => setUserImage("")}
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
                                zIndex: 100,
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

                    <Image
                        style={styles.image}
                        source={{
                            uri: userImage
                                ? image()
                                : "https://www.w3schools.com/w3images/avatar2.png",
                        }}
                    />

                    <TouchableOpacity
                        onPress={() => {
                            navigate.navigate("Camera", { user });
                        }}
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
