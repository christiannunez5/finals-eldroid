import { SafeAreaView } from "react-native-safe-area-context";
import { Navbar } from "../components/Navbar";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { Camera, CameraView } from "expo-camera";
import { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";

export const CameraScreen = ({ route }) => {
    const { user } = route.params;
    const [camera, setCamera] = useState(null);
    const navigate = useNavigation();
    const [image, setImage] = useState(null);
    const [, setHasPermission] = useState();

    const [isFront, setIsFront] = useState(false);

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
                base64: true,
                exif: false,
            };
            const newPhoto = await camera.takePictureAsync(options);
            const base64Image = newPhoto.base64;
            setImage(base64Image);
        }
    };

    const navigateTo = () => {
        const updatedUser = {
            ...user,
            image: image ? image : user.image,
        };

        navigate.navigate(
            user.confirmPassword !== undefined ? "AddUser" : "UpdateUser", // Conditional route name
            { user: updatedUser }
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
                    <CameraView
                        ref={(ref) => setCamera(ref)}
                        style={styles.camera}
                        facing={isFront ? "front" : "back"}
                        ratio={"1:1"}
                    >
                        <View
                            style={{
                                width: "100%",
                                display: "flex",
                                position: "absolute",
                                bottom: 20,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <TouchableOpacity
                                style={{ marginRight: 15 }}
                                onPress={() => setIsFront(!isFront)}
                            >
                                <AntDesign
                                    name="swap"
                                    size={30}
                                    color="white"
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.button}
                                onPress={takePic}
                            ></TouchableOpacity>
                        </View>
                    </CameraView>
                ) : (
                    <View style={{ flex: 1, position: "relative" }}>
                        <Image
                            style={styles.image}
                            source={{
                                uri: `data:image/jpeg;base64,${image}`,
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
    camera: {
        flex: 1,
        position: "relative",
        alignItems: "center",
        backgroundColor: "red",
    },
    button: {
        width: 80, // Set the width of the button
        height: 80, // Set the height of the button to be equal to width for a perfect circle
        borderRadius: 40, // Half of the width and height to make it a circle
        backgroundColor: "white", // Set background color to white (you can change it)
        borderWidth: 5, // Border width for a more prominent button
        borderColor: "#000",
        marginRight: 30,
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
