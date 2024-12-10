import { SafeAreaView } from "react-native-safe-area-context";
import { Navbar } from "../components/Navbar";
import { StyleSheet, TouchableOpacity, View, Image, Text } from "react-native";
import { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

export const CameraScreen = ({ route }) => {
    const { user } = route.params;
    const navigate = useNavigation();
    const [image, setImage] = useState(null);
    const [, setHasPermission] = useState();

    useEffect(() => {
        const requestPermissions = async () => {
            const { status } =
                await ImagePicker.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
            if (status === "granted") {
                openCamera();
            }
        };

        requestPermissions();
    }, []);
    
    const openCamera = async () => {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const navigateTo = () => {
        navigate.navigate(
            user.confirmPassword !== undefined ? "AddUser" : "UpdateUser",
            { user: user, image: image }
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Navbar>
                <TouchableOpacity onPress={navigateTo}>
                    <Ionicons
                        name="arrow-back-outline"
                        size={24}
                        color="white"
                    />
                </TouchableOpacity>
            </Navbar>

            <View style={{ flex: 1 }}>
                {!image ? (
                    <View style={styles.cameraOptions}></View>
                ) : (
                    <View style={{ flex: 1, position: "relative" }}>
                        <Image
                            style={styles.image}
                            source={{
                                uri: image,
                            }}
                        />

                        <View style={styles.button__container}>
                            <TouchableOpacity
                                style={styles.button__camera}
                                onPress={navigateTo}
                            >
                                <FontAwesome5
                                    name="check"
                                    size={24}
                                    color="green"
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.button__camera}
                                onPress={() => setImage(null)}
                            >
                                <Ionicons
                                    name="close-sharp"
                                    size={24}
                                    color="red"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cameraOptions: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    optionButton: {
        padding: 20,
        marginBottom: 20,
        backgroundColor: "#007bff",
        borderRadius: 10,
    },
    optionText: {
        color: "white",
        fontSize: 18,
    },
    image: {
        flex: 1,
    },
    button__container: {
        display: "flex ",
        width: "100%",
        position: "absolute",
        flexDirection: "row",
        alignItems: "center",
        bottom: 10,
        justifyContent: "space-evenly",
    },
    button__camera: {
        height: 60,
        width: 60,
        backgroundColor: "rgba(0,0,0, 0.3)",
        borderRadius: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
});
