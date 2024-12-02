import { SafeAreaView } from "react-native-safe-area-context";
import { Navbar } from "../components/Navbar";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { Camera, CameraView } from "expo-camera";
import { useEffect, useRef, useState } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";

export const CameraScreen = () => {
    const [camera, setCamera] = useState(null);
    const navigate = useNavigation();
    const [image, setImage] = useState(null);
    const [hasPermission, setHasPermission] = useState();
    useEffect(() => {
        const requestPermissions = async () => {
            const cameraPermission =
                await Camera.requestCameraPermissionsAsync();
            setHasPermission(cameraPermission.status === "granted");
        };

        requestPermissions();
    }, []);

    const takePic = async () => {
        if (camera) {
            const options = {
                quality: 1,
                base64: true,
                exif: false,
            };

            const newPhoto = await camera.takePictureAsync(null);
            setImage(newPhoto.uri);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Navbar isCameraScreen />
            <View style={{ flex: 1 }}>
                {!image ? (
                    <CameraView
                        ref={(ref) => setCamera(ref)}
                        style={styles.camera}
                        facing="front"
                        ratio={"1:1"}
                    >
                        <TouchableOpacity
                            style={styles.button}
                            onPress={takePic}
                        ></TouchableOpacity>
                    </CameraView>
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
                                onPress={() =>
                                    navigate.navigate("AddUser", { image })
                                }
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
    camera: {
        flex: 1,
        position: "relative",
        alignItems: "center",
    },
    button: {
        width: 80, // Set the width of the button
        height: 80, // Set the height of the button to be equal to width for a perfect circle
        borderRadius: 40, // Half of the width and height to make it a circle
        backgroundColor: "white", // Set background color to white (you can change it)
        justifyContent: "center", // Center the content inside the button
        alignItems: "center", // Center the content horizontally and vertically
        borderWidth: 5, // Border width for a more prominent button
        borderColor: "#000",
        position: "absolute",
        bottom: 10,
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
