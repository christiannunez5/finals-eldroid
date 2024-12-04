import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { AddUser } from "./pages/AddUser";
import { CameraScreen } from "./pages/CameraScreen";
import { UpdateUser } from "./pages/UpdateUser";
import { Profile } from "./pages/Profile";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="AddUser"
                    component={AddUser}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="Camera"
                    component={CameraScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="UpdateUser"
                    component={UpdateUser}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Profile"
                    component={Profile}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
