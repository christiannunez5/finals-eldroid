import { SafeAreaView } from "react-native-safe-area-context";
import { Navbar } from "../components/Navbar";
import {
    Image,
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { Button } from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export const AddUser = ({ route }) => {
    const { image } = route?.params || {};
    const navigate = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <Navbar />
            <View style={styles.form}>
                <TouchableOpacity
                    onPress={() => navigate.navigate("Camera")}
                    style={{ position: "relative", zIndex: 0 }}
                >
                    <Image
                        style={styles.image}
                        source={{
                            uri: image
                                ? image
                                : "https://media.istockphoto.com/id/610003972/vector/vector-businessman-black-silhouette-isolated.jpg?s=612x612&w=0&k=20&c=Iu6j0zFZBkswfq8VLVW8XmTLLxTLM63bfvI6uXdkacM=",
                        }}
                    />
                    <MaterialIcons
                        name="add-a-photo"
                        size={30}
                        color="black"
                        style={{
                            position: "absolute",
                            bottom: 15,
                            right: 10,
                            zIndex: 300,
                            backgroundColor: "white",
                            padding: 10,
                            borderRadius: 100,
                        }}
                    />
                </TouchableOpacity>

                <TextInput
                    style={styles.input}
                    placeholder="Enter email"
                ></TextInput>

                <TextInput
                    style={styles.input}
                    placeholder="Enter password"
                    secureTextEntry
                ></TextInput>

                <TextInput
                    style={styles.input}
                    secureTextEntry
                    placeholder="Enter confirm password"
                ></TextInput>

                <View
                    style={{
                        flexDirection: "row",
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 5,
                    }}
                >
                    <Button
                        title="Save"
                        style={styles.submit__button}
                        textStyle={{ color: "white" }}
                    />
                    <Button
                        title="cancel"
                        style={styles.cancel__button}
                        textStyle={{ color: "white" }}
                        onPress={() => navigate.navigate("Home")}
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
        width: "50%",
        backgroundColor: "#4CAF50",
    },
    cancel__button: {
        padding: 10,
        borderRadius: 8,
        backgroundColor: "#F44336",
        width: "50%",
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
