import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";

export const Navbar = ({ redirectTo, isHome = false, children }) => {
    const navigate = useNavigation();

    console.log(redirectTo);

    return (
        <View
            style={{
                paddingVertical: 30,
                backgroundColor: "red",
                paddingHorizontal: 15,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
            }}
        >
            {children}
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
                    onPress={() => navigate.navigate("AddUser", {})}
                >
                    <AntDesign name="adduser" size={24} color="white" />
                </TouchableOpacity>
            )}
        </View>
    );
};
