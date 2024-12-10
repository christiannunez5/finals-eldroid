import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

export const Button = (props) => {
    const { onPress, title, textStyle, style } = props;
    
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
            <Text style={[styles.text, textStyle]}>{title}</Text>
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
});
