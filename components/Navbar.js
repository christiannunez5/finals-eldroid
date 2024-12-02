import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";

export const Navbar = ({ isHome = false, isCameraScreen = false }) => {
    const navigate = useNavigation();

    return (
        <View
            style={{
                paddingVertical: 30,
                backgroundColor: "red",
                paddingHorizontal: 15,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 20,
            }}
        >
            {isCameraScreen && (
                <TouchableOpacity onPress={() => navigate.navigate("AddUser")}>
                    <Ionicons
                        name="arrow-back-outline"
                        size={24}
                        color="white"
                    />
                </TouchableOpacity>
            )}
            <Text
                style={{
                    fontFamily: "monospace",
                    fontWeight: "300",
                    fontSize: 20,
                    color: "white",
                }}
            >
                Nunez, Mark Christian
            </Text>

            {isHome && (
                <TouchableOpacity
                    onPress={() => navigate.navigate("AddUser")}
                    style={{ marginLeft: 25 }}
                >
                    <AntDesign name="adduser" size={24} color="white" />
                </TouchableOpacity>
            )}
        </View>
    );
};
