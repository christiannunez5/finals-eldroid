import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

export const Button = (props) => {
    const { onPress, title, textStyle, style, disabled = false } = props;

    return (
        <TouchableOpacity
            onPress={!disabled ? onPress : null}
            style={[styles.button, style, disabled && styles.disabledButton]}
            activeOpacity={disabled ? 1 : 0.7}
        >
            <Text
                style={[
                    styles.text,
                    textStyle,
                    disabled && styles.disabledText,
                ]}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "#007bff",
        borderRadius: 5,
    },
    text: {
        fontFamily: "monospace",
        color: "#fff",
    },
    disabledButton: {
        backgroundColor: "#d3d3d3", // Light gray for disabled state
    },
    disabledText: {
        color: "#a9a9a9", // Darker gray for disabled text
    },
});
