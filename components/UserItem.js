import { TouchableOpacity, Text, Image } from "react-native";

export const UserItem = ({ item, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                padding: 10,
                borderBottomWidth: 1,
                flexDirection: "row",
                gap: 20,
                alignItems: "center",
                borderColor: "#f0f0f0",
            }} 
            onPress={onPress}
        >
            <Image
                style={{ height: 50, width: 50, borderRadius: 100 }}
                source={{
                    uri: item.image,
                }}
            />
            <Text style={{ fontFamily: "monospace", fontSize: 16 }}>
                {item.email}
            </Text>
        </TouchableOpacity>
    );
};
