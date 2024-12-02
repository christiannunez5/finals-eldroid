import { Text, TouchableOpacity } from "react-native";

export const Button = (props) => {
    const { onPress, title, textStyle, style } = props;

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[{ alignItems: "center" }, style]}
        >
            <Text
                style={[
                    { alignItems: "center", fontFamily: "monospace" },
                    textStyle,
                ]}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
};
